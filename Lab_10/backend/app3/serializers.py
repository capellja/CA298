from rest_framework import serializers
from .models import *

class CustomerSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Customer
		fields = ['id','name']


class BookSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Book
		fields = ['id','title', 'author', 'genre', 'year', 'inventory']

class BorrowSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Borrow
		fields = ['id','Customer', 'Book', 'is_returned', 'due_date']
