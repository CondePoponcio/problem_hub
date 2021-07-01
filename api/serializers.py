from rest_framework import serializers
from .models import *
class ProblemasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problemas
        fields = ('id', 'titulo', 'categoria', 'dificultad', 'enunciado', 'casos_prueba', 'origen')

class CrearProblemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problemas
        fields = ('titulo', 'categoria', 'dificultad', 'enunciado', 'casos_prueba', 'origen')
    

class CursosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cursos
        fields = ('id', 'codigo_ramo', 'seccion', 'año', 'semestre')

class CrearCursosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursos
        fields = ('codigo_ramo', 'seccion', 'año', 'semestre')

class RamosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ramos
        fields = ('id', 'programa', 'nombre')

class CrearRamosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ramos
        fields = ('id', 'programa', 'nombre')

class MostrarCursosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursos, Ramos
        fields = ('id', 'nombre', 'codigo_ramo', 'seccion', 'año', 'semestre', 'programa')

class MostrarUsuariosCurso(serializers.ModelSerializer):
    class Meta:
        model = Usuarios, miembros_curso
        fields = ('id', 'curso_id', 'tipo', 'nombres', 'apellidos')

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ('id', 'nombres', 'apellidos', 'correo', 'contraseña')

class MiembroCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = miembros_curso
        fields = ('usuario_id', 'curso_id', 'tipo')