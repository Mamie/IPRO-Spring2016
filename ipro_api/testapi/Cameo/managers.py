'''
Capture Manager
initialized with VideoCapture class
enterFrame() exitFrame()
channel
writeImage() startWritingVideo() stopWritingVideo()
write file until exitFrame()
frame property might be shown in a window
manipulate frame: reflected in any recorded files and in the window
shouldMirrorPreview
frame rate
'''
import cv2
import numpy as np
import time

class CaptureManager(object):
    def __init__(self, capture, previewWindowManager=None, shouldMirrorPreview=False):
        self.previewWindowManager = previewWindowManager
        self.shouldMirrorPreview = shouldMirrorPreview

        self._capture = capture
        self._channel = 0
        self._enteredFrame = False
        self._frame = None
        self._imageFilename = None
        self._videoFilename = None
        self._videoEncoding = None
        self._videoWriter = None

        self._startTime = None
        self._framesElapsed = long(0)
        self._fpsEstimate = None

    @property
    def channel(self):
        return self._channel

    @channel.setter
    def channel(self, value):
        if self._channel != value:
            self._channel = value
            self._frame = None

    @property
    def frame(self):
        if self._enteredFrame and self._frame is None:
            _, self._frame = self._capture.retrieve(channel = self.channel)
        return self._frame

    @property
    def isWritingImage(self):
        return self._imageFilename is not None

    @property
    def isWritingVideo(self):
        return self._videoFilename is not None

    def enterFrame(self):
        """capture the next frame, if any."""
        assert not self._enteredFrame, 'previous enterFrame() has no matching exitFrame()'

        if self._capture is not None:
            self._enterFrame = self._capture.grab()

    def exitFrame(self):
        """Draw to the window. Write to files. Release the frame."""
        if self.frame is None:
            self._enteredFrame = False
            return
        if self._framesElapsed == 0:
            self._startTIme = time.time()
        else:
            timeElapsed = time.time() - self._startTime
            self._fpsEstimate = self._framesElapsed / timeElapsed
            self._framesElapsed += 1
            if self.previewWindowManager is not None:
                if self.shouldMirrorPreview:
                    mirrorFrame = np.fliplr(self._frame).copy()
                    self.previewWindowManager.show(mirrorFrame)
                else:
                    self.previewWindowManager.show(self._frame)
            if self.isWritingImage:
                cv2.imwrite(self._imageFilename, self._frame)
                self._imageFilename = None
            self._writeVideoFrame()
            self._frame = None
            self._enteredFrame = False


