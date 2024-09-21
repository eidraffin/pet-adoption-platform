from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from rest_framework_simplejwt.tokens import AccessToken

from .forms import PetForm

from .models import Pet, AdoptionRequest, ReportPet #, PetImage

from .serializers import PetListSerializer, PetDetailSerializer, AdoptionRequestListSerializer #, PetImageSerializer

from useraccount.models import User

from django.db.models import Q

#from rest_framework.permissions import AllowAny



# =======================================================================
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def pet_list(request):

    pets = Pet.objects.all()
# ============================== AUTH ===================================
    try:
        token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token = AccessToken(token)
        user_id = token.payload['user_id']
        user = User.objects.get(pk=user_id)

    except Exception as e:
        user = None

    favorites = []
    pets = Pet.objects.all()

    #FILTER
    is_favorites = request.GET.get('is_favorites', '')
    useraccount_id = request.GET.get('useraccount_id', '')

    species = request.GET.get('species', '')
    location = request.GET.get('location', '')
    gender = request.GET.get('gender', '')
    age = request.GET.get('age', '')
    price = request.GET.get('price', '')
    size = request.GET.get('size', '')
    spayed_neutered = request.GET.get('spayed_neutered', '')
    is_vaccinated = request.GET.get('is_vaccinated', '')

    if useraccount_id:
        pets = pets.filter(useraccount_id=useraccount_id)

    if is_favorites:
        pets = pets.filter(favorited__in=[user])

    

#===================== search modal filtering =============================

    if species:
        pets = pets.filter(species=species)

    if location:
        pets = pets.filter(location=location)

    if gender:
        pets = pets.filter(gender=gender)

    if size:
        pets = pets.filter(size=size)    

    if age:
        pets = pets.filter(age__gte=age)

    if price:
        pets = pets.filter(price__gte=price)    

    spayed_neutered = spayed_neutered.lower() == 'true'
    is_vaccinated = is_vaccinated.lower() == 'true'

    if spayed_neutered:
        pets = pets.filter(spayed_neutered=True)

    if is_vaccinated:
        pets = pets.filter(is_vaccinated=True)

    keyword = request.GET.get('keyword', '')   
    if keyword:
        pets = Pet.objects.filter(
            Q(name__icontains=keyword) | 
            Q(species__icontains=keyword)|
            Q(location__icontains=keyword)|
            Q(size__icontains=keyword)|
            Q(breed__icontains=keyword)|
            Q(behaviour__icontains=keyword)|
            Q(gender__icontains=keyword)) 

    #favorites
    if user:
        for pet in pets:
            if user in pet.favorited.all():
                favorites.append(pet.id)     

    serializer = PetListSerializer(pets, many=True)

    return JsonResponse({
        'data': serializer.data,
        'favorites': favorites
    })



# =======================================================================
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def pet_detail(request, pk):
    pet = Pet.objects.get(pk=pk)

    serializer = PetDetailSerializer(pet, many=False)

    return JsonResponse(serializer.data)



# =======================================================================
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def pet_adoption_request(request, pk):
    pet = Pet.objects.get(pk=pk)
    adoption_request = pet.adoption_request.all()

    serializer = AdoptionRequestListSerializer(adoption_request, many=True)

    return JsonResponse(serializer.data, safe=False)



# =======================================================================
@api_view(['POST', 'FILES'])
def create_pet_adoption(request):
    form = PetForm(request.POST, request.FILES)        

    if form.is_valid():
        pet = form.save(commit=False)
        pet.useraccount = request.user
        pet.save()
        
        return JsonResponse({'success': True})
        
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)        



# =======================================================================
@api_view(['POST'])
def adopt_pet(request, pk):        
    try:
        adopter_name = request.POST.get('adopter_name', '')
        address = request.POST.get('address', '')
        contact_number = request.POST.get('contact_number', '')
        has_pet = request.POST.get('has_pet', False)  
        reason_for_adoption = request.POST.get('reason_for_adoption', '')

        pet = Pet.objects.get(pk=pk)

        AdoptionRequest.objects.create(
            pet=pet,
            adopter_name=adopter_name,
            address=address,
            contact_number=contact_number,
            has_pet=bool(has_pet),  # convert to boolean explicitly
            reason_for_adoption=reason_for_adoption,
            created_by=request.user
        )

        return JsonResponse({'success': True})
        
    except Exception as e:
        print('Error:', e)
        return JsonResponse({'success': False})



###############################################################################
@api_view(['POST'])
def toggle_favorite(request, pk):
    pet = Pet.objects.get(pk=pk)

    if request.user in pet.favorited.all():
        pet.favorited.remove(request.user)
        return JsonResponse({'is_favorite': False})

    else:
        pet.favorited.add(request.user)
        return JsonResponse({'is_favorite': True})



###############################################################################
@api_view(['POST'])
def report_pet(request, pk):        
    try:
        report_message = request.POST.get('report_message', '')
        pet = Pet.objects.get(pk=pk)
        ReportPet.objects.create(
            pet=pet,
            reporter=request.user,
            report_message=report_message
        )

        return JsonResponse({'success': True})
        
    except Exception as e:
        print('Error', e)

        return JsonResponse({'success': False}) 



###############################################################################
"""
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def all_adoption_request_form_response(request):
#    adoption_request = AdoptionRequest.objects.all()
#    serializer = AdoptionRequestListSerializer(adoption_request, many=True)     
    return JsonResponse({
        'data': serializer.data
    })

    """


# =======================================================================
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def all_adoption_request_form_response(request, pk):
    try:

        user = User.objects.get(pk=pk)

        user_pets = Pet.objects.filter(useraccount=user)

        pet_ids = [pet.id for pet in user_pets]

        adoption_requests = AdoptionRequest.objects.filter(pet__id__in=pet_ids)

        serializer = AdoptionRequestListSerializer(adoption_requests, many=True)

        return JsonResponse({
            'data': serializer.data,
            'pet_ids' :pet_ids
            })


    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)