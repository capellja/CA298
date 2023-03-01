from django.shortcuts import render, HttpResponseRedirect
from django.urls import reverse
from .forms import *
from .models import *

# Create your views here.
def index(request):
    return render(request, 'index.html')



def create_pizza(request):

    if request.method == "POST":
        form = Pizzaform(request.POST)
        if form.is_valid():
            pizzacreated = form.save()
            return render(request, 'pizzacreated.html', {'pizzacreated': pizzacreated})
        else:
						# form has errors
						# send the form back to the user
            return render(request, 'create_pizza.html', {'pizzaform': form})
    else:
        # normal get reuqest, user wants to see the form 
        form = Pizzaform()
        return render(request, 'create_pizza.html', {'pizzaform': form})

def create_customer(request):

    if request.method == "POST":
        form = Customerform(request.POST)
        if form.is_valid():
            customercreated = form.save()
            return HttpResponseRedirect('order')
        else:
						# form has errors
						# send the form back to the user
            return render(request, 'create_customer.html', {'customerform': form})
    else:
        # normal get reuqest, user wants to see the form 
        form = Customerform()
        return render(request, 'create_customer.html', {'customerform': form})
    
def order(request):
    customer = Customer.objects.last()
    pizza = Pizza.objects.last()
    return render(request, 'order.html', {'customer' : customer, 'pizza': pizza})


        
