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
import os

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

            return Response({'msg':'El ramo se ha creado correctamente', 'data': RamosSerializer(ramo).data})
        else:
            return Response({'error': serializer.errors, 'msg':'Los datos no se han ingresado correctamente'})

class CreateCursos(APIView):
    serializer_class = CrearCursosSerializer
    permission_classes = [CheckUserCourse]
    def post(self, request, format=None):
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

class CursosView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        arr = []
        queryset = Cursos.objects.all()
        for i in queryset:
            id = i.id
            nombre = (i.codigo_ramo).nombre
            seccion = int(i.seccion)
            semestre = int(i.semestre)
            año = i.año
            s = {"id": id, "nombre":nombre, "seccion":seccion, "semestre":semestre, "año":año}
            arr.append(s)
        return Response({'data': arr})

class CursoView(APIView):
    serializer_class = CursosSerializer
    permission_classes = [CheckUserCourse]
    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        arr = []
        queryset = Cursos.objects.get(id=id)
        arr = {"id":queryset.id, "nombre":(queryset.codigo_ramo).nombre, "seccion":queryset.seccion, "semestre":queryset.semestre, "año":queryset.año}
        serializer = self.serializer_class(queryset)
        return Response({'data': arr})

class MiembrosCursoView(APIView):
    permission_classes = [CheckUserCourse]
    def get(self, request, *args, **kwargs):
        curso_id = self.kwargs['id']
        arr = []
        queryset = miembros_curso.objects.filter(curso_id=curso_id)
        for i in queryset:
            curso_id = i.curso_id
            tipo = i.tipo
            u = Usuarios.objects.get(id=(i.usuario_id).id)
            id = u.id
            nombres = u.nombres
            apellidos = u.apellidos
            usuario = {"id":id, "nombres":nombres, "apellidos":apellidos, "curso_id":(curso_id).id, "tipo":tipo}
            arr.append(usuario)
        return Response({'data': arr})

class editarTipoUsuarios(APIView):
    permission_classes = [CheckUserCourse]
    def post(self, request, *args, **kwargs):
        curso_id = self.kwargs['id']
        datos = request.data["data"]
        usuarios_id = request.data["usuarios_id"]
        miembros = miembros_curso.objects.filter(curso_id=curso_id)
        i = 0
        j=0
        for miembro in miembros:
            if(i%2==0):
                if(datos[i] == "false"):
                    if(miembro.tipo == "Alumno"):
                        miembros_curso.objects.filter(usuario_id=usuarios_id[j],curso_id=curso_id).update(tipo="Docente")
                        print("Se cambio de Alumno a Docente")
                else:
                    if(miembro.tipo == "Docente"):
                        miembros_curso.objects.filter(usuario_id=usuarios_id[j],curso_id=curso_id).update(tipo="Alumno")
                        print("Se cambio de Docente a Alumno")
                j+=1
            i+=2
            
        return Response({'msg':'Los miembros se han actualizado correctamente'})
        
class UsuarioView(APIView):
    serializer_class = UsuariosSerializer
    permission_classes = [CheckUserCourse]
    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        #id = request.query_params.get('title', None)
        queryset = Usuarios.objects.get(id=id)
        serializer = self.serializer_class(queryset)
        return Response({'data': serializer.data})

class agregarMiembros(APIView):
    serializer_class = MiembroCursoSerializer
    permission_classes = [CheckUserCourse]
    def post(self, request, format=None):
        data = request.data["usuarios"]
        correos = data.split(",")
        print(request.data["curso_id"])
        for correo in correos:
            queryset = Usuarios.objects.get(correo=correo)
            serializer = UsuariosSerializer(queryset)
            ide = serializer.data.get('id')
            usuario_id = Usuarios.objects.get(id=ide)
            curso_id = Cursos.objects.get(id=request.data["curso_id"])
            miembro = miembros_curso(usuario_id=usuario_id, curso_id=curso_id, tipo="Alumno")
            miembro.save()


        return Response({'msg':'Los miembros se ha creado correctamente'})
        #else:
         #   return Response({'error': serializer.errors, 'msg':'Los datos no se han ingresado correctamente'})

class agregarUsuario(APIView):
    serializer_class = UsuariosSerializer
    permission_classes = [CheckUserCourse]
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            nombres = serializer.data.get('nombres')
            apellidos = serializer.data.get('apellidos')
            correo = serializer.data.get('correo')
            contraseña = serializer.data.get('contraseña')
            usuario = Usuarios(nombres=nombres, apellidos=apellidos, correo=correo, contraseña=contraseña)
            usuario.save()

            return Response({'msg':'El usario se ha creado correctamente', 'data': UsuariosSerializer(usuario).data})
        else:
            return Response({'error': serializer.errors, 'msg':'Los datos no se han ingresado correctamente'})

class Scraper(APIView):
    permission_classes = [CheckUserCourse]
    def post(self, request, *args, **kwargs):
        categoria = request.data["categoria"]
        dificultad = request.data["dificultad"]
        call_scrapy(categoria,dificultad)
        return Response({'msg':'Buscando ejercicios'})

def call_scrapy(categoria, dificultad):
    run = '/home/problem_hub/Scrapy/run.sh '+categoria+' '+dificultad
    os.system(run)
