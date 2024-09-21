from django.shortcuts import render

from django.shortcuts import render, get_object_or_404

from .models import Pet, AdoptionRequest, ReportPet



def all_pets(request):
    pets = Pet.objects.all()
    return render(request, 'pet.html', {'pets': pets})



def all_adoption_request_list(request):
    adoption_requests = AdoptionRequest.objects.all()
    return render(request, 'adoptionreq.html', {'adoption_requests': adoption_requests})



def all_pet_reports(request):
    reports = ReportPet.objects.all()
    return render(request, 'petreport.html', {'reports': reports})    