from django import forms
from django_range_slider.fields import RangeSliderField
from .models import Post, Topic


class NewTopicForm(forms.ModelForm):
    message = forms.CharField(
        widget=forms.Textarea(
            attrs={'rows': 5, 'placeholder': 'What is in your mind?'}
        ),
        max_length=4000,
        help_text='The max length of the text is 4000.'
    )

    uploadfile = forms.FileField(required=False, widget=forms.FileInput(attrs={'class': 'form-control', }))

    class Meta:
        model = Topic
        fields = ['subject', 'message','uploadfile']


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['message', ]
