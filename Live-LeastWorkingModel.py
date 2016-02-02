import cv2
import numpy as np
import sys

def printHelpText():
	print 'Welcome to our Least Working Program for IPRO 207 in Spring 2016'
#End Function printHelpText()

def distance(x,y):	
	return ((x[0]-y[0])**2+(x[1]-y[1])**2+(x[2]-y[2])**2)**(0.5)
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
		d=distance(pixel, c)
		if dist==-1 or d<dist:
			dist = d
			index = i 
		i=i+1
	return index
#End Function nearestNeighbor()

cap = cv2.VideoCapture(0)
cv2.namedWindow('Ball And Stick Tracker',cv2.CV_WINDOW_AUTOSIZE)


printHelpText()

quit=False
while not quit:
	retval,image = cap.read()
	cv2.imshow('Ball And Stick Tracker', image)
	key = cv2.waitKey()
	while True:
		retval,image = cap.read()
		image = cv2.medianBlur(image,3)
		cimg = image.copy()
		img = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
		circles = cv2.HoughCircles(img,cv2.cv.CV_HOUGH_GRADIENT,1,20,
                       			    param1=50,param2=30,minRadius=10,maxRadius=50)
		if circles!=None:
			circles = np.uint16(np.around(circles))
			colorNames = ['Black', 'Red', 'Blue']
			color = [[45,45,45], [50,55,90], [105,75,60]]
			count = [0,0,0]

			print 'Found circles'
			for i in circles[0,:]:
				circleColor = averageColor(image, i[1], i[0], 1)
				print cimg[i[1]][i[0]], circleColor
				color_index = nearestNeighbor(color, circleColor)
				count[color_index]=count[color_index]+1
				# draw the outer circle
				cv2.circle(cimg,(i[0],i[1]),i[2],(0,255,0),2)
				# draw the center of the circle
				cv2.circle(cimg,(i[0],i[1]),2,(0,0,255),3)
				cv2.putText(cimg, colorNames[color_index], (i[0],i[1]), cv2.FONT_HERSHEY_SIMPLEX,0.6,(255,255,255),2)			
			#End for
			print count
		#End If

		cv2.imshow('Ball And Stick Tracker', cimg)
		key = cv2.waitKey(10)
		if key==-1: continue
		if chr(key)=='q': 
			quit=True
			break
		elif chr(key)=='p':
			break
		#End While
	#End While
#End While
cap.release()
cv2.destroyAllWindows()





