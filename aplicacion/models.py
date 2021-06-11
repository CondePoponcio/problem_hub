from django.db import models

# Create your models here.

class Persona(models.Model):
    id = models.AutoField(primary_key = True)
    nombre = models.CharField(max_length = 200)
    apellidos = models.CharField(max_length = 255)
    edad = models.IntegerField()
    telefono = models.CharField(max_length = 12)


class Mascota(models.Model):
    id = models.AutoField(primary_key = True)
    nombre = models.CharField(max_length = 150)
    edad = models.IntegerField()
    persona = models.ForeignKey(Persona, on_delete = models.CASCADE)


class Test(models.Model):
    title = models.CharField(max_length=120) #max_length = required
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(decimal_places=2, max_digits=1000)
    summary = models.TextField(blank=False, null=False)
    featured = models.BooleanField(default=False) # null =True || default=True

    #def get_absolute_url(self):
    #    return reverse("products:product-detail", kwargs={"id": self.id}) 


class Like(models.Model):
    user = models.ForeignKey(Persona, on_delete = models.CASCADE)
    post = models.ForeignKey(Mascota, on_delete = models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'post'], name='unique_user_post'),
        ]
