import cv2
import math


class Detection(object):
    def __init__(self, image):
        self.image = image
        self.SMILES = None

        self._circles = None
        self._graph = []
        self._vertexNames = []
        self._atomNames = ['C', 'O', 'N', 'P', 'H']
        self._colorNames = ['Black', 'Red', 'Blue','Purple','White']
        self._colorsBGR = [[34,27,25], [70,25,155], [210,125,75], [165,80,95], [245,175,185]]
        self._count = [0, 0, 0, 0, 0]
        self._edgeRemovalCounter = 1

    def resize(self, ratio):
        self.image = cv2.resize(self.image, (0, 0), fx=ratio, fy=ratio)
        print 'Resized Image: ', self.image.shape

    def detectModel(self):
        #image = cv2.medianBlur(self.image, 3)
        grayImg = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        self._circles = cv2.HoughCircles(grayImg, cv2.HOUGH_GRADIENT, 1, 30, param1=45, param2=25, minRadius=15, maxRadius=50)
        print self._circles
        self._drawAtoms()
        self._drawBonds()
        print self._graph
        self.SMILES = self._DFS()

    def writeImage(self, filename):
        cv2.imwrite(filename, self.image)

    def _drawAtoms(self):
        if not len(self._circles):
            return
        else:
            for circle in self._circles[0]:
                circleColor = self._averageColor(int(circle[1]), int(circle[0]), 1)
                colorIdx = self._nearestNeighbor(circleColor)
                self._count[colorIdx] += 1
                self._vertexNames.append(self._atomNames[colorIdx])
                center = (circle[0], circle[1])
                cv2.circle(self.image, center, circle[2], (0, 255, 0), 2)
                cv2.putText(self.image, self._colorNames[colorIdx], center, cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

    def _drawBonds(self):
        if not len(self._circles):
            return
        for i in self._circles[0]:
            adjList = []
            counter = 0
            for j in self._circles[0]:
                if (i==j).all():
                    counter += 1
                    continue
                if self._detectSingleBond(i, j):
                    adjList.append(counter)
                    cv2.line(self.image, (i[0], i[1]), (j[0], j[1]), (255, 0, 0), 3)
                counter += 1
            self._graph.append(adjList)

    def _distance3D(self, x, y):
        return ((1.0*x[0]-y[0])**2+(1.0*x[1]-y[1])**2+(1.0*x[2]-y[2])**2)**(0.5)

    def _distance2D(self, x, y):
        return ((1.0*x[0]-y[0])**2+(1.0*x[1]-y[1])**2)**(0.5)

    def _averageColor(self, x, y, r):
        total = [0,0,0]
        count = 0
        for dx in [-1*r, r]:
            for dy in [-1*r, r]:
                if x+dx <0: continue
                if x+dx >= self.image.shape[0]: continue
                if y+dy <0: continue
                if y+dy >= self.image.shape[1]: continue
                total[0] = total[0]+self.image[x+dx][y+dy][0]
                total[1] = total[1]+self.image[x+dx][y+dy][1]
                total[2] = total[2]+self.image[x+dx][y+dy][2]
                count=count+1
        total[0]=total[0]/count
        total[1]=total[1]/count
        total[2]=total[2]/count
        return total

    def _nearestNeighbor(self, pixel):
            dist = -1
            index=-1
            i=0
            for c in self._colorsBGR:
                d = self._distance3D(pixel, c)
                if dist==-1 or d<dist:
                    dist = d
                    index = i
                i=i+1
            return index

    def _detectSingleBond(self, c1, c2):
        distance = self._distance2D(c1,c2)
        if distance>5*c1[2] or distance>5*c2[2]: return False
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
            if abs(self._distance3D(self.image[int(math.floor(test[1]))][int(math.floor(test[0]))], [185,135,135]))<45:
                count = count+1
        return count>THRESHOLD

    def _DFS(self):
        if self._graph==None or self._graph==[]: return None
        start = 0
        while len(self._graph[start])==0:
            start=start+1
            if start==len(self._graph): return None
        seen = [False]*len(self._graph)
        self._edgeRemovalCounter=0
        self._removeCycles(seen,start,None)
        ret=''
        seen = [False]*len(self._graph)
        return self._recursiveDFS(seen, start, None)

    def _removeCycles(self, seen, cur, parent):
        seen[cur] = True
        for j in self._graph[cur]:
            if j==parent:
                continue
            if seen[j]:
                self._graph[cur].remove(j)
                self._vertexNames[cur] += self._numberString(self._edgeRemovalCounter)
                self._graph[j].remove(cur)
                self._vertexNames[j] += self._numberString(self._edgeRemovalCounter)
                self._edgeRemovalCounter = self._edgeRemovalCounter + 1
                continue
            self._removeCycles(seen, j, cur)

    def _numberString(self, i):
        if i<10: return str(i)
        return '%'+str(i)

    def _recursiveDFS(self, seen, cur, parent):
    #Assuming graph is acyclic
        seen[cur] = True
        ret = self._vertexNames[cur]
        count=0
        if parent==None: count=-1
        for j in self._graph[cur]:
            if j==parent:
                continue
            if seen[j]:
                continue
            count=count+1
            if not count==len(self._graph[cur])-1:
                ret=ret+'('
            ret=ret+self._recursiveDFS(seen, j, cur)
            if not count==len(self._graph[cur])-1:
                ret=ret+')'
        return ret


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("filename", help="path to the image")
    args = parser.parse_args()
    grayImg = cv2.imread(args.filename)
    model = Detection(grayImg)
    model.resize(0.1)
    model.detectModel()
    model.writeImage(args.filename.split('.')[0]+"detected.jpg")
    print model.SMILES
    #import cirpy
    #print cirpy.resolve(model.SMILES, 'SMILES')

