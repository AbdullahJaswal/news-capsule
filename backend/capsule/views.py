from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Capsule
from .serializers import CapsuleSerializer


class CapsuleListView(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def get_queryset(self):
        tag = self.request.query_params.get("tag")
        location = self.request.query_params.get("location")
        institution = self.request.query_params.get("institution")
        person = self.request.query_params.get("person")

        queryset = Capsule.objects.filter(is_active=True)

        if tag:
            queryset = queryset.filter(tags__slug=tag)

        if location:
            queryset = queryset.filter(locations__slug=location)

        if institution:
            queryset = queryset.filter(institutions__slug=institution)

        if person:
            queryset = queryset.filter(people__slug=person)

        queryset = queryset.prefetch_related(
            "tags", "locations", "institutions", "people"
        ).order_by("-id")

        return queryset

    def get(self, request, *args, **kwargs):
        breaking_capsules = self.get_queryset().filter(status="B")
        featured_capsules = self.get_queryset().filter(status="F")
        normal_capsules = self.get_queryset().filter(status="N")[:20]

        response = {
            "breaking": CapsuleSerializer(breaking_capsules, many=True).data,
            "featured": CapsuleSerializer(featured_capsules, many=True).data,
            "normal": CapsuleSerializer(normal_capsules, many=True).data,
        }

        return Response(response, status=status.HTTP_200_OK)


class CapsuleDetailView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Capsule.objects.filter(is_active=True).prefetch_related(
        "tags",
        "locations",
        "institutions",
        "people",
    )
    serializer_class = CapsuleSerializer
    lookup_field = "slug"
