from django.http import Http404
from django.shortcuts import render, get_object_or_404, redirect

from rest_framework import generics, status
from .serializers import * 
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class ProblemasCreate(generics.CreateAPIView):
    queryset = Problemas.objects.all()
    serializer_class = ProblemasSerializer

"""
class ProblemasView(generics.ListAPIView):
    queryset = Problemas.objects.all()
    serializer_class = ProblemasSerializer



"""
class ProblemasView(APIView):
    serializer_class = ProblemasSerializer
    def get(self, request, format=None):
        queryset = Problemas.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class ViewOneProblem(APIView):
    serializer_class = ProblemasSerializer
    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        #id = request.query_params.get('title', None)
        queryset = Problemas.objects.get(id=id)
        serializer = self.serializer_class(queryset)
        return Response({'data': serializer.data})
  

class CreateProblemas(APIView):
    serializer_class = CrearProblemaSerializer
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
        
            titulo = serializer.data.get('titulo')
            categoria = serializer.data.get('categoria')
            dificultad = serializer.data.get('dificultad')
            enunciado = serializer.data.get('enunciado')
            casos_prueba = serializer.data.get('casos_prueba')
            origen = serializer.data.get('origen')
            curso_id = serializer.data.get('curso_id')

            curso = Cursos.objects.get(id=curso_id)
            #host = self.request.session.session_key
            problem = Problemas(titulo=titulo, categoria=categoria, dificultad=dificultad, enunciado=enunciado,casos_prueba=casos_prueba, origen=origen, curso_id=curso)

            

            problem.save()

            return Response({'msg':'Los datos se han insertado correctamente', 'data': ProblemasSerializer(problem).data})
        else:
            return Response({'error': serializer.errors, 'msg':'Los datos no se han ingresado correctamente'})

def home(request):
    """
    queryset = Problemas.objects.all()
    
    context = {'problems': queryset}
    print(context)
    return render(request, 'servidor/index.html', context)
    """
    return HttpResponse("Hello")















class CursosView(APIView):
    serializer_class = CursosSerializer
    def get(self, request, format=None):
        queryset = Cursos.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class CreateCursos(APIView):
    serializer_class = CrearCursosSerializer
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
            #host = self.request.session.session_key
            curso = Cursos(codigo_ramo=ramo, seccion=seccion, año=año, semestre=semestre)

            

            curso.save()

            return Response({'msg':'El curso se ha creado correctamente', 'data': CursosSerializer(curso).data})
        else:
            return Response({'error': serializer.errors, 'msg':'Los datos no se han ingresado correctamente'})








