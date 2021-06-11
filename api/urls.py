from django.conf.urls import url
from django.urls import path, include

from .views import *

app_name = 'api'

urlpatterns = [
    path('problemas', ProblemasView.as_view()),
    path('crear', CreateProblemas.as_view()),
]