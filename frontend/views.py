from django.shortcuts import render
from administracion.views import * 

from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated
# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

@api_view(['GET'])
@permission_classes([CheckIsAdmin, IsAuthenticated])
def admin(request, *args, **kwargs):
    return render(request, 'frontend/index.html')