from django import forms
from .models import Mascota
class MascotaForm(forms.ModelForm):
    class Meta:
        model = Mascota
        fields = [
            'nombre',
            'edad',
            'persona'
        ]