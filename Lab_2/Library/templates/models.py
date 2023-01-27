from django.db import models

# Create your models here.
class Book(models.Model):
   id = models.AutoField(primary_key=True)
   author = models.CharField(max_length=50)
   category = models.CharField(max_length=50)
   year = models.IntegerField()
   price = models.DecimalField(max_digits=5, decimal_places=2) # number from 0.0-999.99
   title = models.CharField(max_length=100)
   snyopsis = models.TextField()
