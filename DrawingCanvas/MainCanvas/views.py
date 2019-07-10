from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import Drawing
import json

# Create your views here.

def index(request):
    """Function to return the main page of the drawing application."""

    # Editing response headers and returning the same
    response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html'))
    return response

def saveDrawing(request):
    """Function to save drawing in JSON Format on POST request of the same."""

    # Saving drawing if POST request is received
    if request.method == "POST":

        # Retrieving drawing JSON Data and saving the same
        drawing = Drawing(drawingJSONText = request.POST['JSONData'])
        drawing.save()

        # Sending context with message regarding saved location
        context = {
            "message" : "Drawing saved at /loadDrawing/" + str(drawing.id) + "/"
        }

        # Editing response headers and returning the same
        response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html', context))
        return response
    else:
        
        # Editing response headers and returning the same
        response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html'))
        return response


def loadDrawing(request, drawingID = 1):
    """ Function to load the drawing with drawingID if it exists."""
    try:
        # Getting JSON object string of saved drawing
        drawingJSONData = Drawing.objects.get(id = drawingID).drawingJSONText

        # Seding context with appropriate information
        context = {
            "loadIntoJavascript" : True,
            "JSONData" : drawingJSONData
        }

        # Editing response headers and returning the same
        response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html', context))
        return response

    except Drawing.DoesNotExist:

        # Sending context with message regarding wrong location
        context = {
            "message" : "Wrong Location!! No drawing saved at this location!"
        }

        # Editing response headers and returning the same
        response = modifiedResponseHeaders(render(request, 'MainCanvas/index.html', context))
        return response

def modifiedResponseHeaders(response):
    """Function to modify request headers so as to aloow no cached versions of web pages."""

    # Editing response headers
    response["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response["Pragma"] = "no-cache"
    response["Expires"] = "0"

    # Returning response
    return response
