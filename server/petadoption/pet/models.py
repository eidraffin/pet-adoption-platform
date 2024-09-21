import uuid

from django.conf import settings

from django.db import models

from useraccount.models import User



class Pet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.IntegerField()
    location = models.CharField(max_length=255)

    age = models.IntegerField()
    gender = models.CharField(max_length=255)
    breed = models.CharField(max_length=255)
    species = models.CharField(max_length=255)
    size = models.CharField(max_length=255)

    behaviour = models.CharField(max_length=255)
    spayed_neutered = models.BooleanField(default=False)
    is_vaccinated = models.BooleanField(default=False)
    other_medical_history = models.TextField(blank=True)
   
    adoption_status = models.BooleanField(default=True)

    favorited = models.ManyToManyField(User, related_name='favorites', blank=True)
    image = models.ImageField(upload_to='uploads/pets', default='/media/tux-linux.jpg')
    useraccount = models.ForeignKey(User, related_name='pets', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}' 



class AdoptionRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pet = models.ForeignKey(Pet, related_name='adoption_request', on_delete=models.CASCADE)

    adopter_name = models.CharField(max_length=255, default='')
    address = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=15)

    has_pet = models.BooleanField(default=False)
    reason_for_adoption = models.TextField()

    adoption_status = models.BooleanField(default=False)

    created_by = models.ForeignKey(User, related_name='adoption_request', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)



class ReportPet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pet = models.ForeignKey(Pet, related_name='reports', on_delete=models.CASCADE)
    reporter = models.ForeignKey(User, related_name='reported_reports', on_delete=models.CASCADE)
    report_message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)