# Generated by Django 3.2.4 on 2021-06-14 20:06

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cursos',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('seccion', models.DecimalField(decimal_places=0, max_digits=2)),
                ('año', models.IntegerField()),
                ('semestre', models.DecimalField(decimal_places=0, max_digits=2)),
            ],
        ),
        migrations.CreateModel(
            name='Evaluaciones',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_creacion', models.TimeField()),
                ('fecha_inicio', models.TimeField()),
                ('fecha_termino', models.TimeField()),
                ('autor', models.IntegerField()),
                ('curso_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.cursos')),
            ],
        ),
        migrations.CreateModel(
            name='prob_eval',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('evaluacion_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.evaluaciones')),
            ],
        ),
        migrations.CreateModel(
            name='Problemas',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.TextField()),
                ('categoria', models.JSONField()),
                ('dificultad', models.CharField(max_length=7)),
                ('enunciado', models.TextField()),
                ('casos_prueba', django.contrib.postgres.fields.jsonb.JSONField()),
                ('origen', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Ramos',
            fields=[
                ('id', models.CharField(max_length=8, primary_key=True, serialize=False)),
                ('programa', models.TextField()),
                ('nombre', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombres', models.CharField(max_length=35)),
                ('apellidos', models.CharField(max_length=35)),
                ('correo', models.CharField(max_length=255)),
                ('contraseña', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Respuestas',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('numero', models.IntegerField()),
                ('respuesta', models.TextField()),
                ('estudiante_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios')),
                ('prob_eval_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.prob_eval')),
            ],
        ),
        migrations.AddField(
            model_name='prob_eval',
            name='problema_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.problemas'),
        ),
        migrations.CreateModel(
            name='miembros_curso',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tipo', models.TextField()),
                ('curso_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.cursos')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios')),
            ],
        ),
        migrations.AddField(
            model_name='cursos',
            name='codigo_ramo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ramos'),
        ),
        migrations.CreateModel(
            name='Calificaciones',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nota', models.IntegerField()),
                ('evaluacion_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.evaluaciones')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios')),
            ],
        ),
        migrations.AddConstraint(
            model_name='respuestas',
            constraint=models.UniqueConstraint(fields=('prob_eval_id', 'estudiante_id', 'numero'), name='respuestas_key'),
        ),
        migrations.AddConstraint(
            model_name='prob_eval',
            constraint=models.UniqueConstraint(fields=('problema_id', 'evaluacion_id'), name='prob_eval_key'),
        ),
        migrations.AddConstraint(
            model_name='miembros_curso',
            constraint=models.UniqueConstraint(fields=('usuario_id', 'curso_id'), name='miembros_curso_key'),
        ),
        migrations.AddConstraint(
            model_name='cursos',
            constraint=models.UniqueConstraint(fields=('codigo_ramo', 'seccion', 'año', 'semestre'), name='cursos_key'),
        ),
        migrations.AddConstraint(
            model_name='calificaciones',
            constraint=models.UniqueConstraint(fields=('evaluacion_id', 'usuario_id', 'nota'), name='calificaciones_key'),
        ),
    ]
