from django.conf.urls import url
from .views import *
urlpatterns = [
    url(r'^$', home_view, name = "home"),
    url(r'^contact/', contact_view, name = "Contact"),
    url(r'^about/', about_view, name='About'),
]