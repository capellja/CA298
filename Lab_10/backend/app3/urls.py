from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'books', BookViewSet)
router.register(r'borrowed', BorrowViewSet)




urlpatterns = [
    path('books', view_all_books, name='all_books'),
    path('books/genre/<str:bookgenre>', view_book_genre, name='book_genre'),
    path('books/<int:bookid>', view_single_book, name='single_book'),
    path('customer/<int:custid>', view_books_borrowed, name='books_borrowed'),
    path('', index, name="index"),

    path('add', view_api_add, name='api_add'),
    path('subtract', view_api_subtract, name='api_subtract'),
    path('divide', view_api_divide, name='api_divide'),
    path('multiply', view_api_multiply, name='api_multiply'),
    path('exponential', view_api_exponential, name='api_add'),


	path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)), # add the router to our urls

]
