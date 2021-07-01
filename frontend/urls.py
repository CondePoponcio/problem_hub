from django.urls import path, include

from .views import *

app_name = 'frontend'

urlpatterns = [
    path('', index),
    path('home', index),
    path('problemas', index),
    path('join', index),
    path('create', index),
    path('profile', index),
    path('problema/<int:id>', index),
    path('crear_curso', index),
    path('agregarUsuarios/<int:id>', index),
    path('crear_ramo', index),


]