from django.urls import path, include

from .views import *

app_name = 'frontend'

urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index),
    path('problema/<int:id>', index),
]