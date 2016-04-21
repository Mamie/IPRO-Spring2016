import cv2
import numpy as np
import sys
import math

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
	if distance>4*c1[2] and distance>4*c2[2]: return False
	STEPS =25
	PERCENT_SKIP=0.3
	THRESHOLD=0.85
	p1 = c1*PERCENT_SKIP + c2*(1-PERCENT_SKIP)
	p2 = c2*PERCENT_SKIP + c1*(1-PERCENT_SKIP)
	direction = p2-p1
	count=0
	for i in range(STEPS):
		step = direction*i/STEPS
		test = p1 + step
		if abs(distance3D(image[math.floor(test[1])][math.floor(test[0])], [190,150,155]))<45:
			count = count+1
	return count>THRESHOLD
#End Function detectSingleBond()

EDGE_REMOVAL_COUNTER=1
def DFS(graph, vertexNames):
	global EDGE_REMOVAL_COUNTER
	if graph==None or graph==[]: return None
	start = 0
	while len(graph[start])==0:
		start=start+1
		if start==len(graph): return None
	seen = [False]*len(graph)
	EDGE_REMOVAL_COUNTER=0
	removeCycles(graph,vertexNames,seen,start,None)
	ret=''
	seen = [False]*len(graph)	
	return recursiveDFS(graph, vertexNames, seen, start, None)
#End Function DFS(graph, vertexNames)


def removeCycles(graph, vertexNames, seen, cur, parent):
	print 'entering', cur
	global EDGE_REMOVAL_COUNTER
	seen[cur] = True
	for j in graph[cur]:
		if j==parent:
			continue
		if seen[j]:
			graph[cur].remove(j)
			vertexNames[cur] = vertexNames[cur]+numberString(EDGE_REMOVAL_COUNTER)
			graph[j].remove(cur)
			vertexNames[j] = vertexNames[j]+numberString(EDGE_REMOVAL_COUNTER)
			EDGE_REMOVAL_COUNTER = EDGE_REMOVAL_COUNTER+1
			continue
		removeCycles(graph, vertexNames, seen, j, cur)
#End Function removeCycles(graph, vertexNames, seen, cur)

def numberString(i):
	if i<10: return str(i)
	return '%'+str(i)
#End Function numberString(i)

def recursiveDFS(graph, vertexNames, seen, cur, parent):
#Assuming graph is acyclic
	seen[cur] = True
	ret = vertexNames[cur]
	count=0
	if parent==None: count=-1
	for j in graph[cur]:
		if j==parent:
			continue
		if seen[j]:
			continue
		count=count+1
		if not count==len(graph[cur])-1:
			ret=ret+'('
		ret=ret+recursiveDFS(graph, vertexNames, seen, j, cur)
		if not count==len(graph[cur])-1:
			ret=ret+')'
	return ret
#End Function recursiveDFS(graph, vertexNames, seen, cur)

cap = cv2.VideoCapture(1)
cv2.namedWindow('Ball And Stick Tracker',cv2.CV_WINDOW_AUTOSIZE)


printHelpText()

COUNTER=50
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
		circles = cv2.HoughCircles(img,cv2.cv.CV_HOUGH_GRADIENT,1,30,
                       			    param1=45,param2=25,minRadius=15,maxRadius=40)
		if circles!=None:
			circles = np.uint16(np.around(circles))
			atomNames = ['C', 'O', 'N','P','H','F']
			colorNames = ['Black', 'Red', 'Blue','Purple','White','Yellow']
			color = [[27,25,20], [50,20,160], [220,130,88], [185,100,115], [245,175,185],[90,150,170]]
			count = [0,0,0,0,0,0]

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
				cv2.putText(cimg, atomNames[color_index], (i[0],i[1]), cv2.FONT_HERSHEY_SIMPLEX,0.6,(255,255,255),2)			
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
		key = cv2.waitKey(50)
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
		elif chr(key)=='x':
			cv2.imwrite("out"+str(COUNTER)+".jpg",image)
			COUNTER=COUNTER+1
		elif chr(key)=='p':
			break
		#End While
	#End While
#End While
cap.release()
cv2.destroyAllWindows()





