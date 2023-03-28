from rest_framework import generics, permissions

from .models import Capsule
from .pagination import CapsulePagination
from .serializers import CapsuleSerializer


class CapsuleListView(generics.ListAPIView):
    permission_classes = (permissions.IsAdminUser,)
    pagination_class = CapsulePagination
    queryset = Capsule.objects.filter(is_active=True)
    serializer_class = CapsuleSerializer


class CapsuleDetailView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Capsule.objects.filter(is_active=True)
    serializer_class = CapsuleSerializer
    lookup_field = "slug"
