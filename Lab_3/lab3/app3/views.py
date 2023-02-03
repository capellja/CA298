from django.shortcuts import render
from .models import *

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