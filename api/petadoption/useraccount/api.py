from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import User

from .serializers import UserDetailSerializer

from pet.serializers import AdoptionRequestListSerializer

from .forms import UserForm

from django.shortcuts import get_object_or_404

from django.contrib.auth import get_user_model

from rest_framework.authentication import SessionAuthentication

from rest_framework.permissions import IsAuthenticated



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def useraccount_detail(request, pk):

    user = User.objects.get(pk=pk)

    serializer = UserDetailSerializer(user, many=False)

    return JsonResponse(serializer.data, safe=False)



@api_view(['GET'])
def adoption_request_list(request):
    adoption_request = request.user.adoption_request.all()
    #print('user', request.user)
    #print(adoption_request)     
    serializer = AdoptionRequestListSerializer(adoption_request, many=True)
    return JsonResponse(serializer.data, safe=False)



@api_view(['PATCH'])  # Change to PUT method since we're updating
def user_account_update(request, pk):
    user = get_object_or_404(User, id=pk)

    if request.method == 'PATCH':  # Change to PUT method
        serializer = UserDetailSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse(serializer.errors, status=400)



#@api_view(['PATCH'])
#def update_avatar(request, pk):
#    user = get_object_or_404(User, id=pk)
#    if request.method == 'PATCH':
#        avatar = request.FILES.get('avatar')
#        if avatar:
#            user.avatar = avatar
#            user.save()
#            return JsonResponse({'success': True})
#    return JsonResponse({'success': False}, status=400)

#@api_view(['PATCH'])
#def update_avatar(request, pk):
#    form = UserForm(request.POST, request.FILES)       

#    if form.is_valid():
#        user = form.save(commit=False)
#        user.useraccount = request.user
#        user.save()
        
#        return JsonResponse({'success': True})
        
#    else:
#        print('error', form.errors, form.non_field_errors)
#        return JsonResponse({'errors': form.errors.as_json()}, status=400)  



User = get_user_model()
@api_view(['PATCH'])
def update_avatar(request, pk):
    if request.method == 'PATCH':
        form = UserForm(request.POST, request.FILES)
        if form.is_valid():
            current_user = request.user
            user = get_object_or_404(User, pk=pk)
            if user == current_user:
                user.avatar = request.FILES['avatar']
                user.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'errors': 'Unauthorized'}, status=403)
        else:
            return JsonResponse({'errors': form.errors.as_json()}, status=400)


@api_view(['DELETE'])
@authentication_classes([])  
@permission_classes([])  
def delete_account(request, pk):
    dele = User.objects.get(pk=pk)
    dele.delete()
    return JsonResponse({'message': 'Account deleted successfully'}, status=204)