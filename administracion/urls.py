from django.conf.urls import url
from django.urls import path, include

from .views import *

app_name = 'administracion'

urlpatterns = [
    path('crear_curso', CreateCursos.as_view()),
    path('crear_ramo', CreateRamo.as_view()),
    path('agregar_miembros', agregarMiembros.as_view()),
    path('agregar_usuario', agregarUsuario.as_view()),

]