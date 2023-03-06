from django.urls import path, include
from .views import *

urlpatterns = [
    path('', index, name="index"), 
    path('items', view_all_items, name='all_items'),
    path('items/<int:id>', view_single_item, name='single_item'),
    path('items/<str:size>', view_same_size, name='same_size'),
    path('createitem', create_item, name='same_size'),
    	
]