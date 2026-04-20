from django.contrib import admin
from .models import User, Campus, Invite

admin.site.register(User)
admin.site.register(Campus)
admin.site.register(Invite)