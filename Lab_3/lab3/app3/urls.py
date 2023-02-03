from django.urls import path
from .views import *

urlpatterns = [
    path('books', view_all_books, name='all_books'),
    path('books/genre/<str:bookgenre>', view_book_genre, name='book_genre'),
    path('books/<int:bookid>', view_single_book, name='single_book'),
    path('customer/<int:custid>', view_books_borrowed, name='books_borrowed'),
    path('', index, name="index"),

]
