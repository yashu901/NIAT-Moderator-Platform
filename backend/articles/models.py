from django.db import models
from accounts.models import User, Campus

class Article(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    CATEGORY_CHOICES = (
        ('announcement', 'Announcement'),
        ('event', 'Event'),
        ('news', 'News'),
    )

    title = models.CharField(max_length=255)
    body = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='articles/', null=True, blank=True)

    campus = models.ForeignKey(Campus, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title