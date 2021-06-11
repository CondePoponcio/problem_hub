from django import forms

from .models import Product

class ProductForm(forms.ModelForm):
    title = forms.CharField(label='Escribe un titulo', widget = forms.TextInput(
        attrs={
            "placeholder": "Tu título",
            "style": "background-color: red;"
        }
    ))
    email = forms.EmailField()
    description = forms.CharField(required=False, widget=forms.Textarea(
        attrs={
            "class":"new-class-name two",
            "id": "my-id-for-textarea",
            "rows": 20,
            "cols": 100
        }
    ))
    price = forms.DecimalField(initial=99.9)
    summary = forms.CharField()
    class Meta:
        model = Product
        fields = [
            'title',
            'description',
            'price',
            'summary'
        ]
    def clean_title(self, *args, **kwargs):
        title = self.cleaned_data.get("title")
        """
        if not "CFE" in title:
            raise forms.ValidationError("El titulo no es válido.")
        if not 'news' in title:
            raise forms.ValidationError("El titulo no es válido.")
        """
        return title

    def clean_email(self, *args, **kwargs):
        email = self.cleaned_data.get("email")
        if not email.endswith("edu"):
            raise forms.ValidationError("El email no es válido.")
        return email

class RawProductForm(forms.Form):
    title = forms.CharField(label='Escribe un titulo', widget = forms.TextInput(
        attrs={
            "placeholder": "Tu título",
            "style": "background-color: red;"
        }
    ))
    description = forms.CharField(required=False, widget=forms.Textarea(
        attrs={
            "class":"new-class-name two",
            "id": "my-id-for-textarea",
            "rows": 20,
            "cols": 100
        }
        ))
    price = forms.DecimalField(initial=99.9)
    summary = forms.CharField()