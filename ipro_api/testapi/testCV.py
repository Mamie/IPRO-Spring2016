import cv2
import numpy as np
from matplotlib import pyplot as plt

image = cv2.imread('pics/ethanol.jpg')
image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
circles = cv2.HoughCircles(image, cv2.HOUGH_GRADIENT, 1, 30, param1=45, param2=25, minRadius=15, maxRadius=50)
for i in circles[0]:
    cv2.circle(image, (i[0], i[1]), i[2], (0, 255, 0), 2)

cv2.imshow('test', image)
cv2.waitKey(0)
