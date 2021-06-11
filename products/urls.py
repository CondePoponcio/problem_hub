from django.conf.urls import url
from django.urls import path, include

from .views import *

app_name = 'products'

urlpatterns = [
    url(r'^create/', product_create_view, name="product-create"),
    path('', product_list_view, name="product-list"),
    path('<int:id>/', product_detail_view, name="product-detail"),
    path('<int:id>/delete/', product_delete_view, name="product-delete"),
    path('<int:id>/update/', product_delete_view, name="product-update"),
    
]