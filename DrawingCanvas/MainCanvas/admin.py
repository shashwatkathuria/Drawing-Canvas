from django.contrib import admin
from .models import Line, Circle, Drawing

# Register your models here.

admin.site.register(Circle)
admin.site.register(Line)
admin.site.register(Drawing)
