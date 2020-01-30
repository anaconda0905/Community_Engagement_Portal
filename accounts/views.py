from django.http import HttpResponse
from django.contrib.auth import login as auth_login
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth import views as auth_views
from .forms import SignUpForm
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.contrib.auth.models import User
from django.core.mail import EmailMessage


def login_user(request, *args, **kwargs): 
    if request.method == 'POST':
        if not request.POST.get('remember_me', None):
            request.session.set_expiry(60 * 60 * 24 * 30)
    return auth_views.login(request, *args, **kwargs)    

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if not request.POST.get('remember_me', None):
            request.session.set_expiry(60 * 60 * 24 * 30)
        if form.is_valid():
            # username = request.POST.get('username')
            # password = request.POST.get('password')
            # user = authenticate(username=username, password=password)
            # user = form.save()
            # auth_login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            # return redirect('home')
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            message = render_to_string('acc_active_email.html', {
                'user':user, 'domain':current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            # Sending activation link in terminal
            # user.email_user(subject, message)
            mail_subject = 'Activate your blog account.'
            to_email = form.cleaned_data.get('email')
            email = EmailMessage(mail_subject, message, to=[to_email])
            email.send()
            # return HttpResponse('Please confirm your email address to complete the registration.')
            return render(request, 'acc_active_sent.html')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        auth_login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        # return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
        return redirect('home')
    else:
        return HttpResponse('Activation link is invalid!')