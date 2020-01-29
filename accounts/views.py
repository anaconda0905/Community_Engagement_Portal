from django.contrib.auth import login as auth_login
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth import views as auth_views
from .forms import SignUpForm

def login_user(request, *args, **kwargs): 
    if request.method == 'POST':
        if not request.POST.get('remember_me', None):
            request.session.set_expiry(60 * 60 * 24 * 30)
    return auth_views.login(request, *args, **kwargs)    

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            # username = request.POST['username']
            # password = request.POST['password']
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(username=username, password=password)
            user = form.save()
            auth_login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})
