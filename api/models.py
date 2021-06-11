from django.db import models

# Create your models here.
from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.


class Ramos(models.Model):
    id = models.CharField(max_length=8, primary_key=True)
    programa = models.TextField() 
    nombre = models.TextField()


class Cursos(models.Model):
    id = models.AutoField(primary_key=True) 
    codigo_ramo = models.ForeignKey(Ramos, on_delete=models.CASCADE) 
    seccion = models.DecimalField(decimal_places=0,max_digits=2)
    año = models.IntegerField(null=False) 
    semestre = models.DecimalField(decimal_places=0,max_digits=2)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['codigo_ramo', 'seccion', 'año', 'semestre'], name='cursos_key'),
        ]

class Problemas(models.Model):
    id = models.AutoField(primary_key=True) 
    titulo = models.TextField(null=False) 
    categoria = models.JSONField(null=False) 
    dificultad = models.CharField(max_length=7) 
    enunciado = models.TextField(null=False, blank=False) 
    casos_prueba = JSONField(null=False) 
    origen = models.TextField(null=False)
    #curso_id = models.ForeignKey(Cursos, on_delete=models.CASCADE)
    
class Evaluaciones(models.Model):
    id = models.AutoField(primary_key=True) 
    fecha_creacion = models.TimeField() 
    fecha_inicio = models.TimeField() 
    fecha_termino = models.TimeField()
    autor = models.IntegerField()
    curso_id = models.ForeignKey(Cursos, on_delete=models.CASCADE)


class prob_eval(models.Model):
    id = models.AutoField(primary_key=True) 
    problema_id = models.ForeignKey(Problemas, on_delete=models.CASCADE) 
    evaluacion_id = models.ForeignKey(Evaluaciones, on_delete=models.CASCADE)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['problema_id', 'evaluacion_id'], name='prob_eval_key')
        ]

class Usuarios(models.Model):
    id = models.AutoField(primary_key=True) 
    nombres = models.CharField(max_length=35) 
    apellidos = models.CharField(max_length=35) 
    correo = models.CharField(max_length=255) 
    contraseña = models.CharField(max_length=255)


class Respuestas(models.Model):
    id = models.AutoField(primary_key=True) 
    prob_eval_id = models.ForeignKey(prob_eval, on_delete=models.CASCADE) 
    estudiante_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE) 
    numero = models.IntegerField(null=False) 
    respuesta = models.TextField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['prob_eval_id', 'estudiante_id', 'numero'], name='respuestas_key'),
        ]

class Calificaciones(models.Model):
    id = models.AutoField(primary_key=True) 
    evaluacion_id = models.ForeignKey(Evaluaciones, on_delete=models.CASCADE) 
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE) 
    nota = models.IntegerField(null=False)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['evaluacion_id', 'usuario_id', 'nota'], name='calificaciones_key'),
        ]

class miembros_curso(models.Model):
    id = models.AutoField(primary_key=True) 
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE) 
    curso_id = models.ForeignKey(Cursos, on_delete=models.CASCADE) 
    tipo = models.TextField() 
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['usuario_id', 'curso_id'], name='miembros_curso_key'),
        ]
