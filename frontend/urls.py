from django.urls import path, include

from .views import *

app_name = 'frontend'

urlpatterns = [
    path('', index),
    path('dashboard', index),
    path('dashboard/home', index),
    path('dashboard/problemas', index),
    path('dashboard/join', index),
    path('dashboard/create', index),
    path('dashboard/profile', index),
    path('dashboard/problema/<int:id>', index),
    path('dashboard/crear_curso', index),
    path('dashboard/crear_ramo', index),


]