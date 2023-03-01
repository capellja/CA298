from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name="index"),
    path('pizza', create_pizza, name='create_pizza'),
    path('customer', create_customer, name='create_customer'),
    path('order', order, name='order')
]