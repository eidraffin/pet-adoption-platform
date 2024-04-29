from django.contrib import admin

from django.urls import path, include

from django.conf import settings

from django.conf.urls.static import static

from useraccount.views import home_page, user_login, user_account  

from pet.views import all_pets, all_adoption_request_list, all_pet_reports



urlpatterns = [

#======================== admin =======================================       

    path('', home_page, name='home_page'), 

    path('login/', user_login, name='login'),

    path('pets/', all_pets, name='all_pets'),

    path('account/', user_account, name='user_account'), 

    path('pet/<uuid:pk>/', all_pets, name='pet_detail'),

    path('adoption-requests/', all_adoption_request_list, name='all_adoption_request_list'),

    path('petreports/', all_pet_reports, name='all_pet_reports'),

#========================== client ======================================

    path('admin/', admin.site.urls),

    path('api/pets/', include('pet.urls')),

    path('api/auth/', include('useraccount.urls')),

    path('api/chat/', include('chat.urls')),

    path('api/update/', include('useraccount.urls')),

    path('api/adopt_req/', include('pet.urls')),

    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)