from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import Circle, Line, Drawing
import json

# Create your views here.

def index(request):
    response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html'))
    return response

def saveDrawing(request):
    if request.method == "POST":
        savedData = json.loads(request.POST['JSONData'])
        points = savedData['points']
        lines = savedData['lines']
        drawing = Drawing()
        drawing.save()
        for point in points:
            circle = Circle(x = point['x'], y = point['y'], radius = point['r'], fillColor = point['color'])
            circle.save()
            drawing.circles.add(circle)
        for line in lines:
            newLine = Line(x1 = line['x1'], y1 = line['y1'], x2 = line['x2'], y2 = line['y2'], strokeColor = line['strokeColor'], strokeWidth = line['strokeWidth'])
            newLine.save()
            drawing.lines.add(newLine)
        drawing.save()

    response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html'))
    return response

def modifiedResponseHeaders(response):
    response["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response["Pragma"] = "no-cache"
    response["Expires"] = "0"
    return response
