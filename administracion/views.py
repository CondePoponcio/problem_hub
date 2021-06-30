from django.http import Http404
from django.shortcuts import render, get_object_or_404, redirect

from rest_framework import generics, status, filters
from api.serializers import * 
from api.models import *
from rest_framework.views import APIView
from rest_framework.response import Response

#Auth0
from functools import wraps
import jwt

from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated

class CheckUserCourse(BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        #ip_addr = request.META['REMOTE_ADDR']
        #blocked = Blocklist.objects.filter(ip_addr=ip_addr).exists()
        #return not blocked
        return True


# Create your views here.
class CreateRamo(APIView):
    serializer_class = CrearRamosSerializer
    permission_classes = [CheckUserCourse]
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
        
            id = serializer.data.get('id')
            programa = serializer.data.get('programa')
            nombre = serializer.data.get('nombre')
            ramo = Ramos(id=id, programa=programa, nombre=nombre)          

            ramo.save()

            return Response({'msg':'El curso se ha creado correctamente', 'data': RamosSerializer(ramo).data})
        else:
            return Response({'error': serializer.errors, 'msg':'Los datos no se han ingresado correctamente'})

class CreateCursos(APIView):
    serializer_class = CrearCursosSerializer
    permission_classes = [CheckUserCourse]
    def post(self, request, *args, **kwargs):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            codigo_ramo = serializer.data.get('codigo_ramo')
            seccion = serializer.data.get('seccion')
            año = serializer.data.get('año')
            semestre = serializer.data.get('semestre')
            ramo = Ramos.objects.get(id=codigo_ramo)
            curso = Cursos(codigo_ramo=ramo, seccion=seccion, año=año, semestre=semestre)
            curso.save()

            return Response({'msg':'El curso se ha creado correctamente', 'data': CursosSerializer(curso).data})
        else:
            return Response({'error': serializer.errors, 'msg':'Los datos no se han ingresado correctamente'})

class agregarMiembros(APIView):
    serializer_class = MiembroCursoSereializer
    permission_classes = [CheckUserCourse]
    def post(self, request, format=None):
        data = request.data["usuarios"]
        usuarios = data.split(",")
        for correo in correos:
            queryset = Usuarios.objects.get(correo=correo)
            serializer = self.serializer_class(queryset)
            if serializer.is_valid():
                usuario_id = serializer.data.get('id')
                miembro = miembros_curso(usuario_id=usuario_id, curso_id=request.data["curso_id"], tipo="Alumno")
                miembro.save()


            return Response({'msg':'El curso se ha creado correctamente', 'data': RamosSerializer(ramo).data})
        else:
            return Response({'error': serializer.errors, 'msg':'Los datos no se han ingresado correctamente'})

class agregarUsuario(APIView):
    serializer_class = UsuariosSerializer
    permission_classes = [CheckUserCourse]