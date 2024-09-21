from django.urls import path

from . import api


urlpatterns = [
    
    path('', api.pet_list, name='api_pet_list'),

    path('create/', api.create_pet_adoption, name='create_pet_adoption'),

    path('<uuid:pk>/', api.pet_detail, name='api_pet_detail'),

    path('<uuid:pk>/adopt/', api.adopt_pet, name='api_adopt_pet'),

    path('<uuid:pk>/report/', api.report_pet, name='api_report_pet'),

    path('<uuid:pk>/adoption_request/', api.pet_adoption_request, name='api_pet_adoption_request'),

    path('<uuid:pk>/toggle_favorite/', api.toggle_favorite, name='api_toggle_favorite'),

    #path('adoption_request_form_response/', api.all_adoption_request_form_response, name='all_adoption_request_form_response'),

    #path('<uuid:pk>/req_details/', api.all_adoption_request_form_response, name='all_adoption_request_form_response'),

    path('<uuid:pk>/all_adoption_requests/', api.all_adoption_request_form_response, name='api_all_adoption_requests'),


]