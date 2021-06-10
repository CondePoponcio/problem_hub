from django.conf.urls import url
from .views import *
urlpatterns = [
    url(r'^$', home, name = "index"),
    url(r'^crear_mascota/', CreateMascota.as_view(), name = "crear_mascota"),
    url(r'^listar_mascota/', listarMascota, name = "listar_mascota"),
    url(r'^editar_mascota/(?P<id>\d+)/$', editarMascota, name = "editar_mascota"),
    url(r'^eliminar_mascota/(?P<id>\d+)/$', eliminarMascota, name = "eliminar_mascota"),
]