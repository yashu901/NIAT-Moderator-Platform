from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ['author', 'campus', 'created_at']