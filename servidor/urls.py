from django.conf.urls import url
from django.urls import path, include

from .views import *

app_name = 'servidor'

urlpatterns = [
    path('', home, name="home"),
]