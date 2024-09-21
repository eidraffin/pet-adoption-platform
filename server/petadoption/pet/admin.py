from django.contrib import admin

from .models import Pet, AdoptionRequest, ReportPet #, PetImage

# ======== Register your models here ===========

admin.site.register(Pet)

admin.site.register(AdoptionRequest)

admin.site.register(ReportPet)

#admin.site.register(PetImage)

