from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from django.http import JsonResponse
from .serializers import *



# Create your views here.

def view_all_books(request):
    all_books = Book.objects.all()
    return render(request, 'all_books.html', {'books':all_books} )

def view_book_genre(request, bookgenre):
    book_genre = Book.objects.filter(genre=bookgenre) 
    return render(request, 'book_webpage.html', {'book':book_genre, 'genre':bookgenre})

def view_single_book(request, bookid):
    single_book = Book.objects.get(id=bookid)
    borrowings = Borrow.objects.filter(Book=single_book, is_returned=False)
    return render(request, 'single_book.html', {'borrowings':borrowings, 'title':single_book.title, 'book':single_book})

def view_books_borrowed(request, custid):
    cust = Customer.objects.get(id=custid)
    borrowed = Borrow.objects.filter(Customer=cust, is_returned=False)
    returned = Borrow.objects.filter(Customer=cust, is_returned=True)

    return render(request, 'books_borrowed.html', {'borrowed':borrowed, 'name':cust.name, 'id':custid, 'returned': returned}) 

def index(request):
    return render(request, 'index.html')


def view_api_add(request):
	num1 = float(request.GET.get('num1',1)) 
	num2 = float(request.GET.get('num2',1))
	added = num1 + num2 # calculate the added value
	resp_dict = {'result':added}
	return JsonResponse(resp_dict)

def view_api_subtract(request):
	num1 = float(request.GET.get('num1',1)) 
	num2 = float(request.GET.get('num2',1))
	subtracted = num1 - num2 # calculate the added value
	resp_dict = {'result':subtracted}
	return JsonResponse(resp_dict)

def view_api_divide(request):
	num1 = float(request.GET.get('num1',1)) 
	num2 = float(request.GET.get('num2',1))
	divided = num1 // num2 # calculate the added value
	resp_dict = {'result':divided}
	return JsonResponse(resp_dict)

def view_api_multiply(request):
	num1 = float(request.GET.get('num1',1)) 
	num2 = float(request.GET.get('num2',1))
	multiply = num1 * num2 # calculate the added value
	resp_dict = {'result':multiply}
	return JsonResponse(resp_dict)

def view_api_exponential(request):
	num1 = float(request.GET.get('num1',1)) 
	num2 = float(request.GET.get('num2',1))
	exponential = num1 ** num2 # calculate the added value
	resp_dict = {'result':exponential}
	return JsonResponse(resp_dict)


class CustomerViewSet(viewsets.ModelViewSet):
	serializer_class = CustomerSerializer
	queryset = Customer.objects.all()

class BookViewSet(viewsets.ModelViewSet):
	serializer_class = BookSerializer
	queryset = Book.objects.all()

class BorrowViewSet(viewsets.ModelViewSet):
	serializer_class = BorrowSerializer
	queryset = Borrow.objects.all()