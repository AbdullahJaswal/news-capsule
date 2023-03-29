import pycountry
from rest_framework import serializers

from .models import Capsule, Institution, Location, Person, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = (
            "name",
            "slug",
        )


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = (
            "name",
            "slug",
        )


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = (
            "name",
            "slug",
            "description",
        )


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = (
            "name",
            "slug",
            "description",
        )


class CapsuleSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d")

    tags = TagSerializer(many=True)
    institutions = InstitutionSerializer(many=True)
    people = PersonSerializer(many=True)

    locations = serializers.SerializerMethodField()

    def get_locations(self, obj):
        locations = []

        for location in obj.locations.all():
            try:
                country = pycountry.countries.get(
                    name=location.name
                ) or pycountry.countries.get(official_name=location.name)
                country_dict = {}

                if country:
                    country_dict = {
                        k: getattr(country, k)
                        for k in dir(country)
                        if not k.startswith("_")
                    }

                locations.append(
                    {
                        "name": location.name,
                        "slug": location.slug,
                        "info": country_dict,
                    }
                )
            except Exception as e:
                print(f"{location.name}: {e}")

        return locations

    class Meta:
        model = Capsule
        fields = (
            "slug",
            "title",
            "tags",
            "locations",
            "institutions",
            "people",
            "points",
            "created_at",
        )
