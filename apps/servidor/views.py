from django.http import Http404
from django.shortcuts import render, get_object_or_404, redirect

#from .forms import ProductForm, RawProductForm

from .models import Problemas
# Create your views here.


def home(request):

    queryset = Problemas.objects.all()
    
    context = {'problems': queryset}
    print(context)
    return render(request, 'servidor/index.html', context)

