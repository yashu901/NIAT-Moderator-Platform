from django.urls import path
from .views import login_view, me_view , send_invite, onboard

urlpatterns = [
    path('login/', login_view),
    path('me/', me_view),
    path('invite/', send_invite),
    path('onboard/', onboard),
]

