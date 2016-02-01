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
	key=-1
	if len(sys.argv)==2:
		filename = sys.argv[1]
		image = cv2.imread(filename)
		cv2.imshow('Ball And Stick Tracker', image)
		key = cv2.waitKey()
	elif len(sys.argv)<2:
		while key==-1:
			retval,image = cap.read()
			cv2.imshow('Ball And Stick Tracker', image)
			key = cv2.waitKey(5)
	#End If	

	currentImage = cv2.medianBlur(image,5)
	while True:
		if key>=256: break
		if chr(key) == 'i':
			break
		elif chr(key) == 'c':
			print 'here'
			cimg = currentImage
			img = cv2.cvtColor(currentImage,cv2.COLOR_BGR2GRAY)
			print 'there'
			circles = cv2.HoughCircles(img,cv2.cv.CV_HOUGH_GRADIENT,1,20,
                        			    param1=50,param2=30,minRadius=10,maxRadius=60)
			print circles
			if circles==None: break
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
			currentImage = cimg
		elif chr(key) == 'w':
			cv2.imwrite("out.jpg",currentImage)
		elif chr(key) == 'h':
			printHelpText()
		elif chr(key) == 'q':
			quit = True
			break
		else:
			print "Please only use supported chracters."
			break
		#End Ifs

		cv2.imshow('Ball And Stick Tracker', currentImage)
		key = cv2.waitKey()
		#End While
	#End While
#End While
cap.release()
cv2.destroyAllWindows()





