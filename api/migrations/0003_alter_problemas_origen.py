# Generated by Django 3.2.4 on 2021-06-11 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_problemas_categoria'),
    ]

    operations = [
        migrations.AlterField(
            model_name='problemas',
            name='origen',
            field=models.TextField(),
        ),
    ]