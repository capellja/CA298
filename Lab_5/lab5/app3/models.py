from django.db import models

# Create your models here.
# Shop example

class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100) 

    def __str__(self):
        return self.name

class Book(models.Model):
   id = models.AutoField(primary_key=True)
   title = models.CharField(max_length=100) 
   author = models.CharField(max_length=50)
   genre = models.CharField(max_length=50)
   year = models.IntegerField()
   inventory = models.IntegerField()

   def __str__(self):
        return self.title

class Borrow(models.Model):
    id = models.AutoField(primary_key=True)
    Customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    Book = models.ForeignKey(Book, on_delete=models.CASCADE)
    is_returned = models.BooleanField()
    due_date = models.DateField()

    def __str__(self):
        return f'{self.Customer} , {self.Book.title} :: {self.due_date}, {self.is_returned}'

