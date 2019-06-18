from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
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
        print(points)
        print(lines)

    response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html'))
    return response

def modifiedResponseHeaders(response):
    response["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response["Pragma"] = "no-cache"
    response["Expires"] = "0"
    return response
