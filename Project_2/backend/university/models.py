from django.db import models
import string
import random
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


def student_id_generator():
    """
    Generate a random unique id string entirely of numbers of length 8
    Cannot start with 0 or already exist as a student id
    """
    s_id = ''.join(random.choice(string.digits) for x in range(8))
    if s_id.startswith("0") or Student.objects.filter(student_id=s_id).exists():
        s_id = student_id_generator()
    return s_id


class Degree(models.Model):
    full_name = models.TextField()
    shortcode = models.CharField(max_length=5, primary_key=True, unique=True)


class Cohort(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    year = models.PositiveIntegerField(default=1, validators=[MaxValueValidator(4), MinValueValidator(1)]) # maximum value of 4, minimum value of 1
    degree = models.ForeignKey(Degree, on_delete=models.CASCADE)

    def __str__(self):
        def ordinal(n: int):
            if 11 <= (n % 100) <= 13:
                suffix = 'th'
            else:
                suffix = ['th', 'st', 'nd', 'rd', 'th'][min(n % 10, 4)]
            return str(n) + suffix
        return "{} year {}".format(ordinal(self.year), self.degree.full_name)

    def name(self):
        return str(self)


class Student(models.Model):
    student_id = models.CharField(max_length=8, default=student_id_generator, primary_key=True)
    first_name = models.TextField()
    last_name = models.TextField()
    cohort = models.ForeignKey(Cohort, on_delete=models.CASCADE)

    def email(self):
        return "{}.{}@dcu.ie".format(self.first_name.lower(), self.last_name.lower())

    def __str__(self):
        return "{} - {}".format(self.student_id, self.email())


class Module(models.Model):
    code = models.CharField(max_length=5, primary_key=True, unique=True)
    full_name = models.TextField()
    delivered_to = models.ManyToManyField(Cohort)
    ca_split = models.IntegerField(default=0)


class Grade(models.Model):

    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    ca_mark = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(100)])
    exam_mark = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(100)])
    cohort = models.ForeignKey(Cohort, on_delete=models.CASCADE)

    def total_grade(self):
        exam_weight = (100 - self.module.ca_split)/100
        ca_weight = self.module.ca_split/100
        return (self.ca_mark * ca_weight) + (self.exam_mark * exam_weight)


