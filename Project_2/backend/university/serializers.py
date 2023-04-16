from .models import *
from rest_framework import serializers


class DegreeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Degree
        fields = ['full_name', 'shortcode']


class CohortSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cohort
        fields = ['id', 'year', 'degree', 'name']


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'first_name', 'last_name', 'cohort', 'email']


class ModuleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Module
        fields = ['code', 'full_name', 'delivered_to', 'ca_split']


class GradeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Grade
        fields = ['id', 'module', 'ca_mark', 'exam_mark', 'cohort','total_grade', 'student']



