import cv2
import numpy as np
import sys

def printHelpText():
	print 'Welcome to our Least Working Program for IPRO 207 in Spring 2016'
#End Function printHelpText()

cap = cv2.VideoCapture(0)
cv2.namedWindow('Ball And Stick Tracker',cv2.CV_WINDOW_AUTOSIZE)


printHelpText()

quit=False
while not quit:
	retval,image = cap.read()
	cv2.imshow('Ball And Stick Tracker', image)
	key = cv2.waitKey()
	while True:
		print 'here',key
		retval,image = cap.read()
		image = cv2.medianBlur(image,5)
		cimg = image.copy()
		img = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
		circles = cv2.HoughCircles(img,cv2.cv.CV_HOUGH_GRADIENT,1,20,
                       			    param1=60,param2=40,minRadius=10,maxRadius=100)
		print circles
		if circles!=None:
			circles = np.uint16(np.around(circles))
			count=0
			for i in circles[0,:]:
				count=count+1
				if count>10:break
				# draw the outer circle
				cv2.circle(cimg,(i[0],i[1]),i[2],(0,255,0),2)
				# draw the center of the circle
				cv2.circle(cimg,(i[0],i[1]),2,(0,0,255),3)
			#End for
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





