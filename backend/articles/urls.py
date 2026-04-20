from django.urls import path
from .views import *

urlpatterns = [
    path('', get_articles),
    path('create/', create_article),
    path('<int:id>/', get_article),
    path('<int:id>/update/', update_article),
    path('<int:id>/delete/', delete_article),
]