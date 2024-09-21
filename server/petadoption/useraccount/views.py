from django.shortcuts import render, redirect

from django.contrib.auth import authenticate, login

from django.contrib import messages

from django.contrib.auth.decorators import login_required

from .models import User  


def home_page(request):

    return render(request, "home.html")

def user_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')        
        password = request.POST.get('password')        
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('home_page')  # Redirect to the home page upon successful login
        else:
            messages.error(request, 'Invalid email or password. Please try again.')

    return render(request, "login.html")

#@login_required
def user_account(request):
    users = User.objects.all() 
    return render(request, 'useraccount.html', {'users': users})