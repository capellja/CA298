from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Degree)
admin.site.register(Cohort)
admin.site.register(Student)
admin.site.register(Module)
admin.site.register(Grade)