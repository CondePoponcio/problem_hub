from django.http import Http404
from django.shortcuts import render, get_object_or_404, redirect
import requests
from rest_framework import generics, status, filters
from .serializers import * 
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection
from django.core import serializers
#Auth0
from functools import wraps
import jwt

from django.http import JsonResponse


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated


def dictfetchall(cursor): 
    "Returns all rows from a cursor as a dict" 
    desc = cursor.description 
    return [
            dict(zip([col[0] for col in desc], row)) 
            for row in cursor.fetchall() 
    ]



class CheckAluCourse(BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):

        with connection.cursor() as cursor:
            cursor.execute("""
            SELECT api_cursos.* , api_miembros_curso.tipo, api_ramos.nombre
            from api_usuarios, api_miembros_curso, api_cursos , api_ramos
            where api_usuarios.id = api_miembros_curso.usuario_id_id 
            and api_miembros_curso.curso_id_id = api_cursos.id 
            and api_cursos.codigo_ramo_id = api_ramos.id
            and api_usuarios.correo = %s 
            and api_cursos.id = %s 
            and api_miembros_curso.tipo = %s
            """, [request.data.get("correo"), request.data.get("curso"), request.data.get("tipo")])
            
            row = dictfetchall(cursor)
        print("Hey Pipe que es lo que te dio: \n","curso", request.data.get("curso"),"\ntipo", request.data.get("tipo"), row)
        if len(row) == 0:
            return False
        else:
            return True

class CheckCorrectCourse(BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):

        with connection.cursor() as cursor:
            cursor.execute("""
            SELECT api_cursos.* , api_miembros_curso.tipo, api_ramos.nombre
            from api_usuarios, api_miembros_curso, api_cursos , api_ramos
            where api_usuarios.id = api_miembros_curso.usuario_id_id 
            and api_miembros_curso.curso_id_id = api_cursos.id 
            and api_cursos.codigo_ramo_id = api_ramos.id
            and api_usuarios.correo = %s 
            and api_cursos.id = %s 
            """, [request.data.get("correo"), request.data.get("curso")])
            
            row = dictfetchall(cursor)
        print("Hey Pipe que es lo que te dio: ", row, row is None, not row)
        if len(row) == 0:
            return False
        else:
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
    permission_classes = [CheckAluCourse]
    def post(self, request, format=None):
        queryset = Problemas.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class ProblemasFilterView(generics.ListAPIView):
    serializer_class = ProblemasSerializer
    permission_classes = [CheckAluCourse]
    def post(self, request, *args, **kwargs):
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
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        #id = request.query_params.get('title', None)
        queryset = Problemas.objects.get(id=id)
        serializer = self.serializer_class(queryset)
        return Response({'data': serializer.data})

class editProblem(APIView):
    serializer_class = CrearProblemaSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        print("Entro")
        print(kwargs)
        id = self.kwargs['id']
        nuevoEnunciado = request.data['enunciado']
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
    permission_classes = [CheckAluCourse]
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
    permission_classes = [IsAuthenticated]
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

class CursosStudentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        
        with connection.cursor() as cursor:
            cursor.execute("""
            SELECT api_cursos.* , api_miembros_curso.tipo, api_ramos.nombre
            from api_usuarios, api_miembros_curso, api_cursos , api_ramos
            where api_usuarios.id = api_miembros_curso.usuario_id_id 
            and api_miembros_curso.curso_id_id = api_cursos.id 
            and api_cursos.codigo_ramo_id = api_ramos.id
            and api_usuarios.correo = %s""", [request.data.get("correo")])
            
            row = dictfetchall(cursor)
        return Response({'data': row})


class ViewOneCurso(APIView):
    serializer_class = CursosSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        id = self.kwargs['id']
        #id = request.query_params.get('title', None)
        with connection.cursor() as cursor:
            cursor.execute("""
            SELECT api_cursos.* , api_ramos.nombre
            from api_cursos , api_ramos
            where api_cursos.codigo_ramo_id = api_ramos.id
            and api_cursos.id = %s""", [id])
            
            row = dictfetchall(cursor)
        return Response({'data': row})

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




class EvaluacionesView(APIView):
    serializer_class = EvaluacionesSerializer
    permission_classes = [CheckAluCourse, AllowAny]
    #IsAuthenticated
    def get(self, request, format=None):
        queryset = Evaluaciones.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class EvaluacionesCursoView(APIView):
    serializer_class = EvaluacionesSerializer
    permission_classes = [CheckAluCourse, AllowAny]
    #IsAuthenticated
    def get(self, request, *args, **kwargs):
        curso_id = self.kwargs['curso_id']
        queryset = Evaluaciones.objects.get(curso_id=curso_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class ViewOneEvaluacion(APIView):
    serializer_class = EvaluacionesSerializer
    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        #id = request.query_params.get('title', None)
        queryset = Evaluaciones.objects.get(id=id)
        serializer = self.serializer_class(queryset)
        return Response({'data': serializer.data})

class ProbEvalView(APIView):
    serializer_class = ProbEvalSerializer
    permission_classes = [CheckAluCourse, AllowAny]
    #IsAuthenticated
    def get(self, request, format=None):
        queryset = Evaluaciones.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

class DeleteProbEval(APIView):
    serializer_class = EvaluacionesSerializer
    def delete(self, request, *args, **kwargs):
        problema_id = self.kwargs['problema_id']
        curso_id = self.kwargs['curso_id']
        queryset = prob_eval.objects.get(curso_id=curso_id, problema_id=problema_id)
        queryset.delete()
        return Response ('Problema eliminado de la evaluacion')

@api_view(['POST'])
@permission_classes([AllowAny])
def CrearEvaluacion(request, format=None):   
    serializerProblema = CrearEvaluacionesSerializer(data=request.data.get('data1'))
    serializerProbEval = CrearProbEvalSerializer(data=request.data.get('data2'))

    return Response({'respuesta1': request.data.get('data1'), 'respuesta2': request.data.get('data2'), 'respuesta3': serializerProblema.is_valid(), 'respuesta4': serializerProbEval.is_valid})
        #'respuesta1': request.data.get('data1'), 'respuesta2': request.data.get('data2'), 'respuesta3': serializerProblema.is_valid(), 'respuesta4': serializerProbEval.is_valid}) 
    
    
    if serializerProblema.is_valid() and serializerProbEval.is_valid():

        fecha_creacion = serializerProblema.data.get('fecha_creacion') 
        fecha_inicio = serializerProblema.data.get('fecha_inicio') 
        fecha_termino = serializerProblema.data.get('fecha_termino')
        autor = serializerProblema.data.get('autor')
        curso_id = serializerProblema.data.get('curso_id')

        curso = Cursos.objects.get(id=curso_id)
        evaluacion = Evaluaciones(fecha_creacion=fecha_creacion, fecha_inicio=fecha_inicio, fecha_termino=fecha_termino, autor=autor, curso_id=curso)
        
        evaluacion.save()

        problema_id = serializerProbEval.data.get('problema_id')
        problema = Problemas.objects.get(problema_id=problema_id)

        evaluacion_id = serializerProbEval.data.get('evaluacion_id') 
        evaluacion =  Evaluaciones.objects.get(evaluacion_id=evaluacion_id)
        #host = self.request.session.session_key

        probEv = prob_eval(problema_id=problema, evaluacion_id=evaluacion)
        
        probEv.save()
        
        return Response({'msg':'La evaluacion, y los problemas asociados se han creado correctamente', 'data1': EvaluacionesSerializer(evaluacion).data, 'data2':ProbEvalSerializer(probEval).data})
    else:
        return Response({'error1': serializerProblema.errors, 'error2': serializerProbEval.errors, 'msg':'Los datos no se han ingresado correctamente'})


def CalificacionesView(APIView):
    serializer_class = CalificacionesSerializer
    permission_classes = [CheckAluCourse, AllowAny]
    def get(self, request, format=None):
        queryset = Calificaciones.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})


"""
def NotaAlumno(id alumno, id evaluacion)
    serializer_class = CalificacionesSerializer
    permission_classes = [CheckAluCourse, AllowAny]
    #IsAuthenticated
    def get(self, request, *args, **kwargs):
        curso_id = self.kwargs['curso_id']
        queryset = Calificaciones.objects.filter(evaluacion_id=evaluacion_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})
"""


def CalificacionesAlumno(APIView):
    serializer_class = CalificacionesSerializer
    permission_classes = [CheckAluCourse, AllowAny]
    #IsAuthenticated
    def get(self, request, *args, **kwargs):
        curso_id = self.kwargs['curso_id']
        usuario_id = self.kwargs['usuario_id']
        queryset = Calificaciones.objects.filter(evaluacion_id=evaluacion_id, usuario_id = usuario_id )
        serializer = self.serializer_class(queryset, many=True)
        return Response({'data': serializer.data})

def CreateCalificaciones(APIView):
    serializer_class = CrearCalificaciones
    def post(self, request, format=None):
        #if not self.request.session.exists(self.request.session.session_key):
        #    self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            
            evaluacion_id = serializer.data.get('evaluacion_id')
            usuario_id = serializer.data.get('usuario_id')
            nota = serializer.data.get('nota')
            
            calificacion = Calificaciones(evaluacion_id= evaluacion_id, usuario_id=usuario_id, nota=nota)

        
            calificacion.save()

            return Response({'msg':'El curso se ha creado correctamente', 'data': CursosSerializer(curso).data})
        else:
            return Response({'error': serializer.errors, 'msg':'Los datos no se han ingresado correctamente'})














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




@api_view(['GET','POST'])
@permission_classes([AllowAny])
def public(request):
    print("Bueno Django dime que tienes: ", request.POST)
    return JsonResponse({
    "id": 7,
    "titulo": "BagsOfMarbles",
    "categoria": [
        "Greedy",
        "SimpleMath",
        "SimpleSearch",
        "Iteration"
    ],
    "dificultad": "Facil",
    "enunciado": " You want to have desired white marbles. Currently you have none. All the marbles are in bags owned by your friend. Each of your friend's bags contains exactly bagSize marbles. Each of those marbles is either white (you want those) or black (you don't care about those).   Your friends has bags of four types:  no white marblesnoWhiteBagsno black marblesnoBlackBagssome white marblessomeWhiteBagssome black marblessomeBlackBags  You are going to take marbles from your friend's bags, one at a time. More precisely, in each step you may choose any specific bag owned by your friend and take one random marble from that bag.   Return the smallest X such that you can be sure to reach your goal after taking X marbles (provided that you choose the bags in a smart way). If it's impossible to give such a guarantee, return -1 instead. ",
    "casos_prueba": [
        [
            "5",
            "10",
            "0",
            "1",
            "0",
            "0",
            "Returns: 5"
        ],
        [
            "2",
            "10",
            "2",
            "0",
            "1",
            "0",
            "Returns: -1"
        ],
        [
            "51",
            "7",
            "7",
            "7",
            "7",
            "7",
            "Returns: 63"
        ]
    ],
    "origen": "https://community.topcoder.com/stat?c=problem_statement&pm=15827"
})
    return JsonResponse({'message': 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'})


@api_view(['GET'])
def private(request):
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated to see this.'})


