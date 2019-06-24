from django.db import models

# Create your models here.

class Circle(models.Model):
    x = models.CharField(max_length = 100)
    y = models.CharField(max_length = 100)
    radius = models.CharField(max_length = 100)
    fillColor = models.CharField(max_length = 100)

class Line(models.Model):
    x1 = models.CharField(max_length = 100)
    y1 = models.CharField(max_length = 100)
    x2 = models.CharField(max_length = 100)
    y2 = models.CharField(max_length = 100)
    strokeWidth = models.CharField(max_length = 100)
    strokeColor = models.CharField(max_length = 100)

class Drawing(models.Model):
    circles = models.ManyToManyField(Circle)
    lines = models.ManyToManyField(Line)
