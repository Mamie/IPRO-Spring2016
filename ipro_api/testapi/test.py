import cv2
import requests

url = "http://localhost:8000/detect"
image = cv2.imread('test3.jpg')
payload = {'url': 'http://www.pyimagesearch.com/wp-content/uploads/2015/05/obama.jpg'}
r = requests.post(url, data=payload).json()
print "test3.jpg: {}".format(r)

for line in r["lines"]:
    cv2.line(image, (line[0], line[1]), (line[2], line[3]), (255, 0, 0), 3)
for circ in r["circles"]:
    cv2.circle(image, (circ[0], circ[1]), circ[2], (0, 255, 0), 2)
    cv2.circle(image, (circ[0], circ[1]), 2, (0, 0, 255), 3)
cv2.imshow('test3.jpg', image)
cv2.waitKey(0)
