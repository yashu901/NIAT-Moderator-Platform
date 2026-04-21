from django.urls import path
from .views import login_view, me_view , send_invite, onboard
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view()),
    path('me/', me_view),
    path('invite/', send_invite),
    path('onboard/', onboard),
]

