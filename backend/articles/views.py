from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Article
from .serializers import ArticleSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_articles(request):
    user = request.user
    articles = Article.objects.filter(campus=user.campus)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_article(request):
    user = request.user

    if not user.campus:
        return Response({'error': 'User has no campus assigned'}, status=400)

    serializer = ArticleSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(
            author=user,              
            campus=user.campus        
        )
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_article(request, id):
    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    if article.campus != request.user.campus:
        return Response({'error': 'Forbidden'}, status=403)

    serializer = ArticleSerializer(article)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_article(request, id):
    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    if article.campus != request.user.campus:
        return Response({'error': 'Forbidden'}, status=403)

    serializer = ArticleSerializer(article, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_article(request, id):
    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    if article.campus != request.user.campus:
        return Response({'error': 'Forbidden'}, status=403)

    article.delete()
    return Response({'message': 'Deleted successfully'})