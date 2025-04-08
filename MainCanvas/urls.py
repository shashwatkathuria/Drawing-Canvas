from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name = "index"),
    path('savedrawing', views.saveDrawing, name = "saveDrawing"),
    path('loaddrawing/<int:drawingID>/', views.loadDrawing, name = "loadDrawing")
]
