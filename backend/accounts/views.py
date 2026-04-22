from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import Invite, Campus
from django.core.mail import send_mail


User = get_user_model()

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=401)

    if not user.check_password(password):
        return Response({'error': 'Invalid credentials'}, status=401)

    refresh = RefreshToken.for_user(user)

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'role': user.role,
        'campus': user.campus.name if user.campus else None
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    user = request.user

    return Response({
        'username': user.username,
        'role': user.role,
        'campus': user.campus.name if user.campus else None
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_invite(request):
    if request.user.role != 'admin':
        return Response({'error': 'Only admin can invite'}, status=403)

    email = request.data.get('email')
    campus_id = request.data.get('campus')

    if not email or not campus_id:
        return Response({'error': 'Email and campus required'}, status=400)

    try:
        campus = Campus.objects.get(id=campus_id)
    except Campus.DoesNotExist:
        return Response({'error': 'Invalid campus'}, status=400)

    invite = Invite.objects.create(email=email, campus=campus)

   
    link = f"https://your-vercel-app.vercel.app/onboard?token={invite.token}"

    
    send_mail(
        subject="You're invited!",
        message=f"Click this link to join:\n{link}",
        from_email="your_email@gmail.com",
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({
        "message": "Invite created successfully",
        "link": link
    })


@api_view(['POST'])
def onboard(request):
    token = request.data.get('token')
    password = request.data.get('password')

    if not token or not password:
        return Response({'error': 'Token and password required'}, status=400)

    try:
        invite = Invite.objects.get(token=token)
    except Invite.DoesNotExist:
        return Response({'error': 'Invalid token'}, status=400)

    user, created = User.objects.get_or_create(
        username=invite.email,
        defaults={
            "campus": invite.campus,
            "role": "moderator",
            "is_active": True
        }
    )

    user.set_password(password)
    user.is_active = True
    user.save()

    # delete invite after use
    invite.delete()

    return Response({'message': 'Account activated'})