from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class Campus(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('moderator', 'Moderator'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    campus = models.ForeignKey(Campus, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.username
    
class Invite(models.Model):
    email = models.EmailField()
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)