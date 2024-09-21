from django.forms import ModelForm, inlineformset_factory

from .models import Pet#, PetImage


class PetForm(ModelForm):
    class Meta:
        model = Pet
        fields = (
            'name', 'description', 'price', 'location', 'age', 'gender',
            'breed', 'species', 'size', 'behaviour', 'spayed_neutered',
            'is_vaccinated', 'other_medical_history', 'adoption_status',
            'image',
        )
        #'__all__' 


#class PetImageForm(ModelForm):
#    class Meta:
#        model = PetImage
#        fields = ['title', 'image'] 

#PetImageFormSet = inlineformset_factory(Pet, PetImage, form=PetImageForm, extra=9)
