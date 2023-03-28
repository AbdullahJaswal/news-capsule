from rest_framework import serializers

from .models import Capsule


class CapsuleSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Capsule
        fields = (
            "slug",
            "title",
            "points",
            "created_at",
        )
