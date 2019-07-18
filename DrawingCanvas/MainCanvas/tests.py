from django.test import Client, TestCase
from .models import Drawing
import json
# Create your tests here.

# Sample drawing saved at drawing ID 11
sampleDrawing = '{"points":[{"x":376,"y":80.51681518554688,"r":1,"color":"black"},{"x":376,"y":80.51681518554688,"r":1,"color":"black"},{"x":377,"y":80.51681518554688,"r":1,"color":"black"},{"x":379,"y":80.51681518554688,"r":1,"color":"black"},{"x":381,"y":80.51681518554688,"r":1,"color":"black"},{"x":383,"y":79.51681518554688,"r":1,"color":"black"},{"x":387,"y":79.51681518554688,"r":1,"color":"black"},{"x":390,"y":79.51681518554688,"r":1,"color":"black"},{"x":393,"y":79.51681518554688,"r":1,"color":"black"},{"x":394,"y":79.51681518554688,"r":1,"color":"black"}],"lines":[{"x1":376,"y1":80.51681518554688,"x2":376,"y2":80.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":376,"y1":80.51681518554688,"x2":377,"y2":80.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":377,"y1":80.51681518554688,"x2":379,"y2":80.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":379,"y1":80.51681518554688,"x2":381,"y2":80.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":381,"y1":80.51681518554688,"x2":383,"y2":79.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":383,"y1":79.51681518554688,"x2":387,"y2":79.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":387,"y1":79.51681518554688,"x2":390,"y2":79.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":390,"y1":79.51681518554688,"x2":393,"y2":79.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":393,"y1":79.51681518554688,"x2":394,"y2":79.51681518554688,"strokeWidth":"2","strokeColor":"black"}]}'

class DrawingTestCase(TestCase):

    def setUp(self):
        drawingJSONText = sampleDrawing
        drawing = Drawing.objects.create(drawingJSONText = drawingJSONText)

    def testDrawingCount(self):
        drawings = Drawing.objects.all()

        self.assertEqual(drawings.count(), 1)

    def testDrawingDetails(self):
        drawings = Drawing.objects.all()

        self.assertEqual(sampleDrawing, drawings[0].drawingJSONText)

    def testdrawingJSONFormat(self):
        drawingText = Drawing.objects.get(id = 1).drawingJSONText

        try:
            json.loads(drawingText)
        except:
            self.assertEqual(1, "--INVALID FORMAT FOR JSON--")
