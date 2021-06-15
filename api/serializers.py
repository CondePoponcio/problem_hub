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
        fields = ('programa', 'nombre')