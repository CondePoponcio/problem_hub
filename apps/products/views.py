from django.http import Http404
from django.shortcuts import render, get_object_or_404, redirect

from .forms import ProductForm, RawProductForm

from .models import Product
# Create your views here.


"""
def product_create_view(request):
    print("Entro")
    my_form = RawProductForm()
    if request.method == 'POST':
        my_form = RawProductForm(request.POST)
        if my_form.is_valid():
            print(my_form.cleaned_data)
            Product.objects.create(**my_form.cleaned_data)
        else:
            print(my_form.errors)
        my_new_title = request.POST.get('title')
        print(my_new_title)

    context = {'form': my_form}
    return render(request, 'products/product_create.html', context)
"""


def product_create_view(request):
    initial_data = {
        'title': 'My awesome title',
        "description": "Hola buenos días a \n todos"
    }
    obj = Product.objects.get(id=1)
    #Initial data override instance object data exept if a value is empty
    form = ProductForm(request.POST or None, initial=initial_data, instance=obj)
    if form.is_valid():
        form.save()
        form = ProductForm()
    context = {
        'form': form
    }
    return render(request, 'products/product_create.html', context)


def product_detail_view(request, id):
    #obj = Product.objects.get(id=my_id)
    """
    try:
        obj = Product.objects.get(id=id)
    except Product.DoesNotExist:
        raise Http404
    """
    obj = get_object_or_404(Product, id=id)
    context = {
        "object": obj
    }
    return render(request, "products/product_detail.html", context)

def product_delete_view(request, id):
    #obj = Product.objects.get(id=my_id)
    obj = get_object_or_404(Product, id=id)
    
    if request.method == "POST":
        #confirm delete
        obj.delete()
        return redirect('/products/create')
    context = {
        "object": obj
    }
    return render(request, "products/product_delete.html", context)

def product_list_view(request):
    queryset = Product.objects.all()
    context = {
        "object_list": queryset
    }
    return render(request, "products/product_list.html", context)