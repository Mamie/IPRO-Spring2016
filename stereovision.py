from pylab import *
import cv2
import sys

NUMBER_OF_POINTS_LOGGED=0
output = []

def log_point(event,x,y,flags,param):
	global output
	if event == cv2.EVENT_LBUTTONDOWN:
		output = output+[(x,y)]
		cv2.circle(vis,(x,y),4,(255,0,0),-1)
#End Function log_point()

def plot_epipolar(event,x,y,flags,param):
	global F2, img1, img2, vis
	if event == cv2.EVENT_LBUTTONDOWN:
		if x<img1.shape[1]:
			l = transpose(F2).dot([x,y,1])
			temp = img2.copy()
			drawLine(l[0]/l[2], l[1]/l[2], (0,255,0), temp)
			vis = np.concatenate((img1, temp), axis=1)
		else:
			l = F2.dot([x-img1.shape[1],y,1])
			temp = img1.copy()
			drawLine(l[0]/l[2], l[1]/l[2], (0,255,0), temp)
			vis = np.concatenate((temp, img2), axis=1)
#End Function log_point()

def printHelpText():
	print 'Welcome to the test stereovision program'
	print 'First select the corresponding points in each image one at a time.'
	print '   alternating in left image, then right, then left, then right and so on'
	print 'After an even number of points have been selected, press f to continue'
	print 'The fundamental matrix will be printed out.'
	print 'Then clicking in either image will draw the epipolar line in the other.'
	print 'Press q to terminate the program'
#End Function printHelpText()


def average(R):
	totalX = 0.0
	totalY = 0.0
	for r in R:
		totalX = totalX + r[0]
		totalY = totalY + r[1]
	return (totalX/len(R), totalY/len(R))
#End Function average()

def variance(R, mu):
	totalError = 0.0
	for r in R:
		totalError = totalError + (mu[0]-r[0])**2 + (mu[1]-r[1])**2
	return totalError/len(R)
#End Function variance()

def drawLine(a, b, color, image):
	y0 = -1/b
	x0 = -1/a
	yW = y0 - image.shape[1]*(a/b)
	xW = x0 - image.shape[0]*(b/a)
	c=0
	p = [[0,0],[0,0],[0,0],[0,0]]
	if(x0>= 0 and x0 <= image.shape[1]):
		p[c][0] = int(x0)
		p[c][1] = 0
		c = c+1
	if(xW>= 0 and xW <= image.shape[1]):
		p[c][0] = int(xW)
		p[c][1] = image.shape[0]
		c = c+1
	if(y0>= 0 and y0 <= image.shape[0]):
		p[c][0] = 0
		p[c][1] = int(y0)
		c = c+1
	if(yW>= 0 and yW <= image.shape[0]):
		p[c][0] = image.shape[1]
		p[c][1] = int(yW)
		c = c+1
	cv2.line(image,(p[0][0],p[0][1]),(p[1][0],p[1][1]),color,2)
#End Function drawLine()






cap = cv2.VideoCapture(0)
cv2.namedWindow('Display',cv2.CV_WINDOW_AUTOSIZE)
cv2.setMouseCallback('Display',log_point)

printHelpText()
quit=False

filename1 = sys.argv[1]
filename2 = sys.argv[2]
img1 = cv2.imread(filename1)
img2 = cv2.imread(filename2)
vis = np.concatenate((img1, img2), axis=1)

cv2.imshow('Display', vis)
key = 0 #cv2.waitKey() & 0xFF

if len(sys.argv)==3:
	while not quit:	
		if chr(key) == 'h':
			printHelpText()
		elif chr(key) == 'w':
			cv2.imwrite("out.jpg",vis)
		elif chr(key) == 'f':
			quit = True
			break
		#End Ifs
		cv2.imshow('Display', vis)
		key = cv2.waitKey(50) & 0xFF
	#End While
elif len(sys.argv)==4:
	filename3 = sys.argv[3]
	pointFile = open(filename3, 'r')
	numPoints = int(pointFile.readline())
	for x in pointFile:
		output=output+[(int(x.split()[0]), int(x.split()[1])),(int(x.split()[2]), int(x.split()[3]))]
else:
	print 'Program needs at least two arguments'
#End If


#Split the output into P and Q
P = []
Q = []
flag = True
for r in output:
	if flag:
		P = P+[r]
	else:
		Q = Q+[(r[0]-img1.shape[1],r[1])]
	flag = not flag


#Normalize P and Q
muP = average(P)
stdP = sqrt(variance(P, muP))


muQ = average(Q)
stdQ = sqrt(variance(Q, muQ))

normP = []
for p in P:
	newP = ( (p[0]-muP[0])/stdP, (p[1]-muP[1])/stdP )
	normP = normP +[newP]

normQ = []
for q in Q:
	newQ = ( (q[0]-muQ[0])/stdQ, (q[1]-muQ[1])/stdQ )
	normQ = normQ +[newQ]


#Compute F for normalized values
A = np.zeros((len(normP), 9))
for i in range(0,len(normP),1):
	A[i][0]=normP[i][0]*normQ[i][0]
	A[i][1]=normP[i][0]*normQ[i][1]
	A[i][2]=normP[i][0]*1
	A[i][3]=normP[i][1]*normQ[i][0]
	A[i][4]=normP[i][1]*normQ[i][1]
	A[i][5]=normP[i][1]*1
	A[i][6]=          1*normQ[i][0]
	A[i][7]=          1*normQ[i][1]
	A[i][8]=          1*1

U, D, V = np.linalg.svd(A)

col = V[8]

normF = [[col[0],col[1],col[2]],
         [col[3],col[4],col[5]],
         [col[6],col[7],col[8]]]

#Make rank 2
U, D, V = np.linalg.svd(normF)

D[2]=0

F1 = U.dot(np.diag(D)).dot(V)


#Compute F for un-normalized values
normSP = np.array([[1/stdP,0,0],[0,1/stdP,0],[0,0,1]])
normTP = np.array([[1,0,-1*muP[0]],[0,1,-1*muP[1]],[0,0,1]])
Mp = normSP.dot(normTP)

normSQ = np.array([[1/stdQ,0,0],[0,1/stdQ,0],[0,0,1]])
normTQ = np.array([[1,0,-1*muQ[0]],[0,1,-1*muQ[1]],[0,0,1]])
Mq = normSQ.dot(normTQ)

F2 = transpose(Mp).dot(F1).dot(Mq)


#Print fundamental matrix
print 'Fundamental Matrix',F2


#Find Epipoles
U, D, V = np.linalg.svd(transpose(F2))

print 'Left Epipole', V[2][0]/V[2][2], V[2][1]/V[2][2]

U, D, V = np.linalg.svd(F2)

print 'Right Epipole', V[2][0]/V[2][2], V[2][1]/V[2][2]


#Plot epipolar lines as given by user

cv2.setMouseCallback('Display', plot_epipolar)
quit=False
while not quit:
	if chr(key) == 'h':
		printHelpText()
	elif chr(key) == 'q':
		quit = True
		break
	#End Ifs
	cv2.imshow('Display', vis)
	key = cv2.waitKey(50) & 0xFF
#End While



cap.release()
cv2.destroyAllWindows()





