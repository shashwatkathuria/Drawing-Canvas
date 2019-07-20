from django.test import Client, TestCase
from .models import Drawing
import json, re
from bs4 import BeautifulSoup
# Create your tests here.

# Sample drawing saved at drawing ID 11
sampleDrawing = '{"points":[{"x":376,"y":80.51681518554688,"r":1,"color":"black"},{"x":376,"y":80.51681518554688,"r":1,"color":"black"},{"x":377,"y":80.51681518554688,"r":1,"color":"black"},{"x":379,"y":80.51681518554688,"r":1,"color":"black"},{"x":381,"y":80.51681518554688,"r":1,"color":"black"},{"x":383,"y":79.51681518554688,"r":1,"color":"black"},{"x":387,"y":79.51681518554688,"r":1,"color":"black"},{"x":390,"y":79.51681518554688,"r":1,"color":"black"},{"x":393,"y":79.51681518554688,"r":1,"color":"black"},{"x":394,"y":79.51681518554688,"r":1,"color":"black"}],"lines":[{"x1":376,"y1":80.51681518554688,"x2":376,"y2":80.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":376,"y1":80.51681518554688,"x2":377,"y2":80.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":377,"y1":80.51681518554688,"x2":379,"y2":80.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":379,"y1":80.51681518554688,"x2":381,"y2":80.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":381,"y1":80.51681518554688,"x2":383,"y2":79.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":383,"y1":79.51681518554688,"x2":387,"y2":79.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":387,"y1":79.51681518554688,"x2":390,"y2":79.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":390,"y1":79.51681518554688,"x2":393,"y2":79.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":393,"y1":79.51681518554688,"x2":394,"y2":79.51681518554688,"strokeWidth":"2","strokeColor":"black"}]}'

# Test drawing to be saved
testDrawingToBeSaved = '{"points":[{"x":290,"y":371.5168151855469,"r":1,"color":"black"},{"x":276,"y":110.51681518554688,"r":1,"color":"black"},{"x":277,"y":110.51681518554688,"r":1,"color":"black"},{"x":278,"y":110.51681518554688,"r":1,"color":"black"},{"x":278,"y":110.51681518554688,"r":1,"color":"black"}],"lines":[{"x1":276,"y1":110.51681518554688,"x2":277,"y2":110.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":277,"y1":110.51681518554688,"x2":278,"y2":110.51681518554688,"strokeWidth":"2","strokeColor":"black"},{"x1":278,"y1":110.51681518554688,"x2":278,"y2":110.51681518554688,"strokeWidth":"2","strokeColor":"black"}]}'

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

def checkResponseHeaders(response):
    return response["Cache-Control"] == "no-cache, no-store, must-revalidate" and response["Pragma"] == "no-cache" and response["Expires"] == "0"

class ClientsInteractionTestCase(TestCase):

    def setUp(self):
        drawingJSONText = sampleDrawing
        drawing = Drawing.objects.create(drawingJSONText = drawingJSONText)

    def testIndexPage(self):
        client = Client()

        response = client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(checkResponseHeaders(response))
        self.assertTemplateUsed(response, 'MainCanvas/index.html')

    def testLoadDrawing(self, id = 1, drawing = sampleDrawing):
        client = Client()

        response = client.get("/loaddrawing/"+ str(id) +"/")

        self.assertEqual(response.status_code, 200)
        self.assertTrue(checkResponseHeaders(response))
        self.assertTemplateUsed(response, 'MainCanvas/index.html')

        Scraper = BeautifulSoup(str(response.content.decode()), "html.parser")
        responseDrawingJSONTest = Scraper.find("input", {"id": "JSONLoadData"})['value']
        self.assertEqual(drawing, responseDrawingJSONTest)

    def testPostSaveDrawing(self):
        client = Client()

        response = client.post('/savedrawing', {'JSONData' : testDrawingToBeSaved})

        self.assertEqual(response.status_code, 200)
        self.assertTrue(checkResponseHeaders(response))
        self.assertTemplateUsed(response, 'MainCanvas/index.html')

        Scraper = BeautifulSoup(str(response.content.decode()), "html.parser")
        element = Scraper.find("div", {'class' : "alert alert-warning"})
        drawingID = int(re.search(r'\d+', str(element.encode_contents())).group())

        self.testLoadDrawing(id = drawingID, drawing = testDrawingToBeSaved)

    def testGetSaveDrawing(self):
        client = Client()

        response = client.get('/savedrawing')

        self.assertEqual(response.status_code, 200)
        self.assertTrue(checkResponseHeaders(response))
        self.assertTemplateUsed(response, 'MainCanvas/index.html')
