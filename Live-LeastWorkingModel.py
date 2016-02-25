import cv2
import numpy as np
import sys
import math
import cirpy
import Visualization.query as query

def printHelpText():
	print 'Welcome to our Least Working Program for IPRO 207 in Spring 2016'
#End Function printHelpText()

def distance3D(x,y):
	return ((1.0*x[0]-y[0])**2+(1.0*x[1]-y[1])**2+(1.0*x[2]-y[2])**2)**(0.5)
#End Function distance()
def distance2D(x,y):
	return ((1.0*x[0]-y[0])**2+(1.0*x[1]-y[1])**2)**(0.5)
#End Function distance()

def averageColor(image,x,y,r):
	total=[0,0,0]
	count=0
	for dx in [-1*r, r]:
		for dy in [-1*r, r]:
			if x+dx <0: continue
			if x+dx >= image.shape[0]: continue
			if y+dy <0: continue
			if y+dy >= image.shape[1]: continue
			total[0] = total[0]+image[x+dx][y+dy][0]
			total[1] = total[1]+image[x+dx][y+dy][1]
			total[2] = total[2]+image[x+dx][y+dy][2]
			count=count+1
	total[0]=total[0]/count
	total[1]=total[1]/count
	total[2]=total[2]/count
	return total
#End Function distance()

def nearestNeighbor(colors, pixel):
	dist = -1
	index=-1
	i=0
	for c in colors:
		d=distance3D(pixel, c)
		if dist==-1 or d<dist:
			dist = d
			index = i
		i=i+1
	return index
#End Function nearestNeighbor()

def detectSingleBond(image, c1, c2):
	distance = distance2D(c1,c2)
	if distance>5*c1[2] or distance>5*c2[2]: return False
	STEPS =25
	PERCENT_SKIP=0.3
	THRESHOLD=0.90
	p1 = c1*PERCENT_SKIP + c2*(1-PERCENT_SKIP)
	p2 = c2*PERCENT_SKIP + c1*(1-PERCENT_SKIP)
	direction = p2-p1
	count=0
	for i in range(STEPS):
		step = direction*i/STEPS
		test = p1 + step
		if abs(distance3D(image[int(math.floor(test[1]))][int(math.floor(test[0]))], [240,250,240]))<75:
			count = count+1
	return count>THRESHOLD
#End Function detectSingleBond()

def DFS(graph, vertexNames):
	if graph==None or graph==[]: return None
	start = 0
	while len(graph[start])==0:
		start=start+1
		if start==len(graph): return None
	ret=''
	seen = [False]*len(graph)
	stack = [start]
	while not len(stack)==0:
		cur = stack.pop()
		if seen[cur]: continue
		seen[cur]=True
		ret = ret+vertexNames[cur]
		for i in range(len(graph)):
			if i in graph[cur] and not seen[i]:
				stack.append(i)
	return ret
#End Function DFS(graph, vertexNames)

cap = cv2.VideoCapture(0)
cv2.namedWindow('Ball And Stick Tracker',cv2.WINDOW_AUTOSIZE)


printHelpText()


quit=False
while not quit:
	retval,image = cap.read()
	cv2.imshow('Ball And Stick Tracker', image)
	key = cv2.waitKey()
	while True:
		vertexNames = None
		graph = None

		retval,image = cap.read()
		image = cv2.medianBlur(image,3)
		cimg = image.copy()
		img = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
		circles = cv2.HoughCircles(img,cv2.HOUGH_GRADIENT,1,30,
                       			    param1=50,param2=35,minRadius=15,maxRadius=50)
		if circles!=None:
			circles = np.uint16(np.around(circles))
			atomNames = ['C', 'O', 'C']
			colorNames = ['Black', 'Red', 'Blue']
			color = [[45,45,45], [130,160,240], [255,240,180]]#[[45,45,45], [50,55,90], [105,75,60]]
			count = [0,0,0]

			vertexNames = []
			graph = []
			for i in circles[0,:]:
				circleColor = averageColor(image, i[1], i[0], 1)
				color_index = nearestNeighbor(color, circleColor)
				count[color_index]=count[color_index]+1
				vertexNames.append(atomNames[color_index])

				# draw the outer circle
				cv2.circle(cimg,(i[0],i[1]),i[2],(0,255,0),2)
				# draw the center of the circle
				cv2.circle(cimg,(i[0],i[1]),2,(0,0,255),3)
				cv2.putText(cimg, colorNames[color_index], (i[0],i[1]), cv2.FONT_HERSHEY_SIMPLEX,0.6,(255,255,255),2)
			#End for

			#Mark Connections
			for i in circles[0,:]:
				adjList = []
				counter=0
				for j in circles[0,:]:
					if (i==j).all():
						counter=counter+1
						continue
					if detectSingleBond(image,i,j):
						adjList.append(counter)
						cv2.line(cimg,(i[0],i[1]),(j[0],j[1]),(255,0,0),3)
					#End if
					counter=counter+1
				#End for
				graph.append(adjList)
			#End for
			#print vertexNames
			#print count
			#print graph
		#End If

		cv2.imshow('Ball And Stick Tracker', cimg)
		key = cv2.waitKey(20)
		if key==-1: continue
		if chr(key)=='q':
			quit=True
			break
		elif chr(key)=='s':
			print 's was pressed'
			print vertexNames
			print graph
			smile = DFS(graph, vertexNames)
			print smile
			print ''
			if smile==None:
				continue
			molfile = query.MOL( smile )
			if not molfile == None:
				name = query.iupac( smile )
				filename = name + '.mol' if not name==None else smile+'.mol'
				print molfile
				with open( filename, 'w') as infile:
					infile.write( molfile )
					quit=True

				query.pymol_show( filename )
				break
		elif chr(key)=='p':
			break
		#End While
	#End While
#End While
cap.release()
cv2.destroyAllWindows()





