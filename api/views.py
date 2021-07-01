from django.http import Http404
from django.shortcuts import render, get_object_or_404, redirect
import requests
from rest_framework import generics, status, filters
from .serializers import * 
from .models import *
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
    permission_classes = [CheckUserCourse]
    def get(self, request, format=None):
        queryset = Problemas.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class ProblemasFilterView(generics.ListAPIView):
    serializer_class = ProblemasSerializer
    permission_classes = [CheckUserCourse]
    def get(self, request, *args, **kwargs):
        print(kwargs['data'])
        if(kwargs['data'] != "none" and kwargs['data'] != "categoria=&dificultad=Null"):
            print("Filtro")
            datos = kwargs['data'].split("&")
            cat = datos[0].replace("categoria=","")
            dif = datos[1].replace("dificultad=","")
            print(cat)
            print(dif)
            if(cat == ""):
                queryset = Problemas.objects.all().filter(dificultad=dif).order_by('titulo')
            elif(dif == "Null"):
                search = Problemas.objects.all().order_by('titulo')
                queryset = []
                for query in search:
                    if(cat in query.categoria):
                        queryset.append(query)
            else:
                search = Problemas.objects.all().filter(dificultad=dif).order_by('titulo')
                queryset = []
                for query in search:
                    if(cat in query.categoria):
                        queryset.append(query)
        else:
            print("no filtro")
            queryset = Problemas.objects.all().order_by('titulo')
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class ViewOneProblem(APIView):
    serializer_class = ProblemasSerializer
    permission_classes = [CheckUserCourse]
    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        #id = request.query_params.get('title', None)
        queryset = Problemas.objects.get(id=id)
        serializer = self.serializer_class(queryset)
        return Response({'data': serializer.data})

class editProblem(APIView):
    serializer_class = CrearProblemaSerializer
    permission_classes = [CheckUserCourse]
    def get(self, request, *args, **kwargs):
        print("Entro")
        print(kwargs)
        id = self.kwargs['id']
        nuevoEnunciado = self.kwargs['data']
        queryset = Problemas.objects.get(id=id)
        serializer = self.serializer_class(queryset)
        
        
        titulo = serializer.data.get('titulo')
        categoria = serializer.data.get('categoria')
        dificultad = serializer.data.get('dificultad')
        casos_prueba = serializer.data.get('casos_prueba')
        origen = serializer.data.get('origen')


        problem = Problemas(titulo=titulo, categoria=categoria, dificultad=dificultad, enunciado=nuevoEnunciado,casos_prueba=casos_prueba, origen=origen)

            

        problem.save()
        print("Done")

        return Response({'data': ProblemasSerializer(problem).data})
  

class CreateProblemas(APIView):
    serializer_class = CrearProblemaSerializer
    permission_classes = [CheckUserCourse]
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

class RamoView(APIView):
    serializer_class = RamosSerializer
    permission_classes = [CheckUserCourse]
    def get(self, request, format=None):
        queryset = Ramos.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class CursosView(APIView):
    serializer_class = CursosSerializer
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        queryset = Cursos.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class ViewOneCurso(APIView):
    serializer_class = CursosSerializer
    permission_classes = [CheckUserCourse]
    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        #id = request.query_params.get('title', None)
        queryset = Cursos.objects.get(id=id)
        serializer = self.serializer_class(queryset)
        return Response({'data': serializer.data})

class UsuariosView(APIView):
    serializer_class = UsuariosSerializer
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        queryset = Usuarios.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class MiembrosView(APIView):
    serializer_class = MiembroCursoSerializer
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        queryset = miembros_curso.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})



def home(request):
    """
    queryset = Problemas.objects.all()
    
    context = {'problems': queryset}
    print(context)
    return render(request, 'servidor/index.html', context)
    """
    return HttpResponse("Hello")






















@api_view(['GET'])
@permission_classes([AllowAny])
def apidermacne(request):
    url = 'https://www.dermacne.cl/precios'
    obj = {'algo': 'No importa'}
    response_data = requests.post(url, data = obj)
    response_data.close()
    print(response_data.status_code, response_data, response_data.json())
    return Response(response_data.json())



def get_token_auth_header(request):
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token

def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            decoded = jwt.decode(token, verify=False)
            if decoded.get("scope"):
                token_scopes = decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return f(*args, **kwargs)
            response = JsonResponse({'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope




@api_view(['GET'])
@permission_classes([AllowAny])
def public(request):
    return JsonResponse({'message': 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'})


@api_view(['GET'])
def private(request):
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated to see this.'})


