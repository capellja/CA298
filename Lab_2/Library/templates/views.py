from django.shortcuts import render
from .models import *
from django.shortcuts import get_object_or_404, get_list_or_404

# Create your views here.

def view_all_books(request):
    all_books = Book.objects.all()
    return render(request, 'all_books.html', {'books':all_books} )

def view_single_book(request, bookid):
	single_book = get_object_or_404(Book, id=bookid)
	return render(request, 'single_book.html', {'book':single_book})

def index(request):
    return render(request, 'index.html')

def view_book_year(request, bookyear):
	book_year = get_list_or_404(Book, year=bookyear)
	return render(request, 'book_webpage.html', {'book':book_year})

def view_book_category(request, bookcategory):
    book_category = Book.objects.filter(category=bookcategory)  
    return render(request, 'book_webpage.html', {'book':book_category})

def view_book_catyear(request, bookcategory, bookyear):
    book_catyear = Book.objects.filter(category=bookcategory, year=bookyear )  
    return render(request, 'book_webpage.html', {'book':book_catyear})