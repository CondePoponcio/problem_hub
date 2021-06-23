from django.conf.urls import url
from django.urls import path, include

from .views import *

app_name = 'api'

urlpatterns = [
    path('problemas', ProblemasView.as_view()),
    path('problemas/<str:data>', ProblemasFilterView.as_view()),
    path('crear', CreateProblemas.as_view()),
    path('problema/<int:id>', ViewOneProblem.as_view()),
    path('problema/edit/<int:id>', editProblem.as_view()),
    path('cursos', CursosView.as_view()),
    path('crear_curso', CreateCursos.as_view()),
    
]