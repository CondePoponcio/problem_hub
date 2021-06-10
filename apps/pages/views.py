from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home_view(request, *args, **kwargs): # args, **kwargs
    #return HttpResponse("<h1>hello1 World</h1>") # string of HTML code
    return render(request, 'pages/home.html',{})

def contact_view(request, *args, **kwargs): # args, **kwargs
    #return HttpResponse("<h1>Contact Page</h1>") # string of HTML code
    return render(request, 'pages/contact.html',{})

def about_view(request, *args, **kwargs): # args, **kwargs
    #return HttpResponse("<h1>About Page</h1>") # string of HTML code
    my_context = {
        "my_text": "This is about us",
        "my_number": 123,
        "my_list": [12232,4342,"Hola",4]
    }
    return render(request, 'pages/about.html', my_context)

