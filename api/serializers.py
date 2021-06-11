from rest_framework import serializers
from .models import *
class ProblemasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problemas
        fields = ('id', 'titulo', 'categoria', 'dificultad', 'enunciado', 'casos_prueba', 'origen')

class CrearProblemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problemas
        fields = ('titulo', 'categoria', 'dificultad', 'enunciado', 'casos_prueba', 'origen', 'curso_id')
    

class CursosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cursos
        fields = ('id', 'codigo_ramo' 'seccion', 'año', 'semestre')