from django import forms
from django.forms import ModelForm, ModelChoiceField
from django.db import transaction
from .models import *

class Itemform(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['name', 'description', 'size', 'type', 'price', 'colour']

    ## error checking and validation to be added

def clean(self):
        data=self.cleaned_data
        name = data['name']
        description = data['description']
        size = data['size']
        type = data['type']
        price = data['price']
        colour = data['colour']
