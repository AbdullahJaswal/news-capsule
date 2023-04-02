from django.db.models import Case, IntegerField, When
from rest_framework import generics, permissions

from .models import Capsule
from .pagination import CapsulePagination
from .serializers import CapsuleSerializer


class CapsuleListView(generics.ListAPIView):
    permission_classes = (permissions.IsAdminUser,)
    pagination_class = CapsulePagination
    serializer_class = CapsuleSerializer

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

        queryset = (
            queryset.prefetch_related("tags", "locations", "institutions", "people")
            .annotate(
                status_order=Case(
                    When(status="B", then=0),
                    When(status="F", then=1),
                    When(status="N", then=2),
                    output_field=IntegerField(),
                )
            )
            .order_by("status_order", "-id")
        )

        return queryset


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
