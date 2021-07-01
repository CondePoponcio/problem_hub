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
    #ADMIN
    path('dashboard/crear_curso', index),
    path('dashboard/crear_ramo', index),
    path('dashboard/agregarUsuarios', index),
    path('cursosAdmin',index),
<<<<<<< HEAD
    path('cursoAdmin/<int:id>',index),
    path('scraper',index),


=======
    path('cursoAdmin/<int:id>',index)
>>>>>>> 396787dfab917c4008ea934a5934e631f4a07424
]