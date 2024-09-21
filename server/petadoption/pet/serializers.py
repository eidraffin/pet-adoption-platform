from rest_framework import serializers

from .models import Pet, AdoptionRequest#, PetImage

from useraccount.serializers import UserDetailSerializer


class PetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = (
            'id',
            'name',
            'price',
            'image_url',
            'age',
            'gender',
            'species',
            'location',
            'is_vaccinated',                        
        )



class PetDetailSerializer(serializers.ModelSerializer):

    useraccount = UserDetailSerializer(read_only=True, many=False)

    class Meta:
        model = Pet
        fields = (
            'id',
            'name',
            'description',
            'price',
            'location',
            'age',
            'gender',
            'breed',
            'species',
            'size',
            'behaviour',
            'spayed_neutered',
            'is_vaccinated',
            'other_medical_history',
            'image_url',
            'created_at',
            'useraccount',
        )



class AdoptionRequestListSerializer(serializers.ModelSerializer):

    pet = PetListSerializer(read_only=True, many=False)
    
    class Meta:
        model = AdoptionRequest
        fields = (
            'id',
            'adopter_name',
            'address',
            'contact_number',
            'has_pet',
            'reason_for_adoption',
            'adoption_status',
            'created_by',
            'pet',
        )



#class PetImageSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = PetImage
#        fields = ('id', 'image_url')