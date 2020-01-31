from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm):
    email = forms.CharField(max_length=254, required=True, widget=forms.EmailInput())
    birth_date = forms.DateField(help_text='Required. Format: YYYY-MM-DD')
    # email = forms.EmailField(widget=forms.EmailInput(), attrs={'class': "form_control form-control-lg", 'placeholder': "Email"}, required=True, )
    class Meta:
        model = User
        fields = ('username', 'email', 'birth_date', 'password1', 'password2')
    def clean_email(self):
        """
        Returns the email if entered email is unique otherwise gives duplicate_email error.
        """
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('duplicate_email')
        return email