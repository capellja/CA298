from django.db import models

# Create your models here.
class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    SIZE_CHOICES = (
        ('XS', 'XS'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),

    )
    size = models.CharField(max_length=50, choices=SIZE_CHOICES, default='S')
    TYPE_CHOICES = (
        ('Tops', 'Tops'),
        ('Bottoms', 'Bottoms'),
        ('Shoes', 'Shoes'),
        ('Coats', 'Coats'),
    )
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='Tops')

    price = models.IntegerField()
    colour = models.CharField(max_length=50)

#    stock
#   size
#    type