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
        """Function to set up testcase - save a sample drawing into test database."""

        # Saving sampleDrawing in database
        drawingJSONText = sampleDrawing
        drawing = Drawing.objects.create(drawingJSONText = drawingJSONText)

    def testDrawingCount(self):
        """Function to test the number of drawings saved in the test database."""

        # Getting all the drawings in the database
        drawings = Drawing.objects.all()

        # Testing the number of drawngs saved
        self.assertEqual(drawings.count(), 1)

    def testDrawingDetails(self):
        """Function to test whether correct drawing is saved in the database."""

        # Getting all the drawings
        drawings = Drawing.objects.all()

        # Verifying the drawing saved
        self.assertEqual(sampleDrawing, drawings[0].drawingJSONText)

    def testdrawingJSONFormat(self):
        """Function to test the format of the json drawing saved."""

        # Getting JSON Text of drawing saved
        drawingText = Drawing.objects.get(id = 1).drawingJSONText

        # Try block raises an error if format of JSON is incorrect
        try:
            json.loads(drawingText)
        # Statement to print error
        except:
            # Not testing this assert, just a alert for test failure
            self.assertEqual(1, "--INVALID FORMAT FOR JSON--")

def checkResponseHeaders(response):
    """Function to test the response headers as saved in views."""
    return response["Cache-Control"] == "no-cache, no-store, must-revalidate" and response["Pragma"] == "no-cache" and response["Expires"] == "0"

class ClientsInteractionTestCase(TestCase):

    def setUp(self):
        """Function to set up testcase - save a sample drawing into test database."""

        drawingJSONText = sampleDrawing
        drawing = Drawing.objects.create(drawingJSONText = drawingJSONText)

    def testIndexPage(self):
        """Function to test index page of app."""

        # Initializing a new client
        client = Client()

        # Requesting for index page through GET request
        response = client.get("/")

        # Testing for necessary asserts
        self.assertEqual(response.status_code, 200)
        self.assertTrue(checkResponseHeaders(response))
        self.assertTemplateUsed(response, 'MainCanvas/index.html')

    def testLoadDrawing(self, id = 1, drawingToBeTestedWith = sampleDrawing):
        """Function to test load page of app given drawing ID and drawing
           to be tested with."""

        # Initializing a new client
        client = Client()

        # Requesting for load page through GET request with id
        response = client.get("/loaddrawing/"+ str(id) +"/")

        # Testing for necessary asserts
        self.assertEqual(response.status_code, 200)
        self.assertTrue(checkResponseHeaders(response))
        self.assertTemplateUsed(response, 'MainCanvas/index.html')

        # Scraping response html for necessary JSON Data and
        # testing it with the drawing to be tested with
        Scraper = BeautifulSoup(str(response.content.decode()), "html.parser")
        responseDrawingJSONTest = Scraper.find("input", {"id": "JSONLoadData"})['value']
        self.assertEqual(drawingToBeTestedWith, responseDrawingJSONTest)

    def testPostSaveDrawing(self):
        """Function to test the save drawing page(POST request) of app."""

        # Initializing a new client
        client = Client()

        # Requesting for save drawing through POST request and
        # test drawing as post data
        response = client.post('/savedrawing', {'JSONData' : testDrawingToBeSaved})

        # Testing for necessary asserts
        self.assertEqual(response.status_code, 200)
        self.assertTrue(checkResponseHeaders(response))
        self.assertTemplateUsed(response, 'MainCanvas/index.html')

        # Scraping response html for necessary drawing ID and
        # testing that drawing with load drawing test
        Scraper = BeautifulSoup(str(response.content.decode()), "html.parser")
        element = Scraper.find("div", {'class' : "alert alert-warning"})
        drawingID = int(re.search(r'\d+', str(element.encode_contents())).group())

        # Testing the above extracted drawing ID with load drawing test
        self.testLoadDrawing(id = drawingID, drawing = testDrawingToBeSaved)

    def testGetSaveDrawing(self):
        """Function to test the save drawing page(GET request) of app."""

        # Initializing a new client
        client = Client()

        # Requesting for save page through GET request
        response = client.get('/savedrawing')

        # Testing for necessary asserts
        self.assertEqual(response.status_code, 200)
        self.assertTrue(checkResponseHeaders(response))
        self.assertTemplateUsed(response, 'MainCanvas/index.html')
