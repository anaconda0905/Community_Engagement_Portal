from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Board
from .models import Post
from .models import Topic

admin.site.register(Board)
admin.site.register(Post)

@admin.register(Topic)
class TopicAdmin(OSMGeoAdmin):
    pass

