#imports for forms.py 
from django import forms
from django.forms import TextInput
from datetime import date
from .models import *

class Pizzaform(forms.ModelForm):
	class Meta:
		model = Pizza # picked up from importing models.py
		fields = ['size','crust','sauce', 'cheese',
        'pepperoni', 'chicken', 'ham', 'pineapple',
        'peppers', 'mushrooms', 'onions']

class Customerform(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['name', 'street', 'town', 'postcode',
        'card_no', 'cvv', 'card_expiry_month', 'card_expiry_year']
        
        ## place holder ##
        widgets = {
            'name': TextInput(attrs={
                'class': "form-control",
                'style': 'max-width: 300px;',
                'placeholder': 'eg. John Doe'
                }),

            'card_no': TextInput(attrs={
                'class': "form-control",
                'style': 'max-width: 300px;',
                'placeholder': 'Street'
                }),

            'card_no': TextInput(attrs={
                'class': "form-control",
                'style': 'max-width: 300px;',
                'placeholder': 'Town'
                }),
        
            'card_no': TextInput(attrs={
                'class': "form-control",
                'style': 'max-width: 300px;',
                'placeholder': 'Postcode'
                }),
        
            'card_no': TextInput(attrs={
                'class': "form-control",
                'style': 'max-width: 300px;',
                'placeholder': '(16-digits)'
                }),

            'cvv': TextInput(attrs={
                'class': "form-control",
                'style': 'max-width: 300px;',
                'placeholder': '000'
                }),
        }

    # Error Checking / Validation #
    def clean(self):
        data=self.cleaned_data
        name = data['name']
        street = data['street']
        town = data['town']
        postcode = data['postcode']
        card_no = data['card_no']
        card_expiry_month = data['card_expiry_month']
        card_expiry_year = data['card_expiry_year']
        cvv = data['cvv']

        if(card_expiry_month > 12):
            raise forms.ValidationError("Card Expiry Error: month value greater than 12")
        elif(card_expiry_year < date.today().year ):
            raise forms.ValidationError("Card Expiry Error: year is invalid")
        elif(card_no < 0 ):
            raise forms.ValidationError("Card Number Error: number can not be negative")
        elif(len(str(cvv)) != 3):
            raise forms.ValidationError("CVV Error: 3 digits not present")
        elif(len(str(card_no)) > 16):
            raise forms.ValidationError("Invalid Card no: Too Many digits")
        elif(len(str(card_no)) < 16):
            raise forms.ValidationError("Invalid Card no: Missing digits")
        elif(street== ""):
            raise forms.ValidationError("Street Missing")
        elif(town== ""):
            raise forms.ValidationError("Town Missing")
        elif(postcode== ""):
            raise forms.ValidationError("Postcode Missing")
        elif(name == ""):
            raise forms.ValidationError("Name Missing")

        return data
