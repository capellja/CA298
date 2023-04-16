from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from .models import *
from .serializers import *
from django_filters import rest_framework as filters
# Create your views here.


class DegreeViewSet(viewsets.ModelViewSet):
    serializer_class = DegreeSerializer
    queryset = Degree.objects.all()
    permission_classes = [AllowAny]


class CohortViewSet(viewsets.ModelViewSet):
    serializer_class = CohortSerializer
    permission_classes = [AllowAny]
    model = Cohort
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['degree']
    queryset = Cohort.objects.all()
    


class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    model = Student
    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['cohort']
    queryset = Student.objects.all()


class ModuleViewSet(viewsets.ModelViewSet):
    serializer_class = ModuleSerializer
    model = Module
    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['delivered_to']
    queryset = Module.objects.all()


class GradeViewSet(viewsets.ModelViewSet):
    serializer_class = GradeSerializer
    model = Grade
    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = [ 'student', 'module', 'cohort']
    queryset = Grade.objects.all()
