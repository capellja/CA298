from django.shortcuts import render
from .models import *
from .forms import *

# Create your views here.
def index(request):
    return render(request,'index.html')

def view_all_items(request):
    item = Item.objects.all()
    return render(request,'view_all_items.html', {'item':item})

def view_single_item(request, id):
    single_item = Item.objects.get(id=id)
    return render(request, 'view_single_item.html', {'item':single_item})

def view_same_size(request, size):
    item = Item.objects.filter(size=size)
    return render(request, 'view_same_size.html', {'item':item})

def create_item(request):

    if request.method == "POST":
        form = Itemform(request.POST)
        if form.is_valid():
            itemcreated = form.save()
            return render(request, 'itemcreated.html', {'item': itemcreated})
        else:
                            # form has errors
                            # send the form back to the user
            return render(request, 'create_item.html', {'itemform': form})
    else:
        # normal get reuqest, user wants to see the form 
        form = Itemform()
        return render(request, 'create_item.html', {'itemform': form})
