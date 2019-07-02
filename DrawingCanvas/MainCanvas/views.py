from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import Drawing
import json

# Create your views here.

def index(request):
    response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html'))
    return response

def saveDrawing(request):
    if request.method == "POST":
        drawing = Drawing(drawingJSONText = request.POST['JSONData'])
        drawing.save()

    context = {"message" : "Drawing saved at /loadDrawing/" + str(drawing.id) + "/"}

    response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html', context))
    return response

def loadDrawing(request, drawingID):
    drawing = json.loads(Drawing.objects.get(id = drawingID).drawingJSONText)
    context = {
        "points" : drawing['points'],
        "lines" : drawing['lines']
    }
    response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html', context))
    return response

def modifiedResponseHeaders(response):
    response["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response["Pragma"] = "no-cache"
    response["Expires"] = "0"
    return response
