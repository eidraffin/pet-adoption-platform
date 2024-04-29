from django.forms import ModelForm, inlineformset_factory
from .models import User

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ('avatar',) #'__all__' 