from datetime import timedelta

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from django_extensions.db.fields import AutoSlugField

from news.models import Article
from utils.slugify_function import slugify_function

related_names = {
    "capsules": "capsule_capsules",
    "tags": "capsule_tags",
    "locations": "capsule_locations",
    "institutions": "capsule_institutions",
    "people": "capsule_people",
}


# Create your models here.
class Capsule(models.Model):
    STATUS_CHOICES = (
        ("N", "Normal"),
        ("F", "Featured"),
        ("B", "Breaking"),
    )

    articles = models.ManyToManyField(Article, related_name=related_names["capsules"])

    title = models.CharField(max_length=1000, null=False, blank=False)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, null=False, blank=False, default="N"
    )
    status_duration = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(48)],
        null=True,
        blank=True,
        default=None,
    )

    sentiment = models.IntegerField(null=True, blank=True)
    points = models.JSONField(default=list, null=False, blank=False)

    tags = models.ManyToManyField("Tag", related_name=related_names["tags"])
    locations = models.ManyToManyField(
        "Location", related_name=related_names["locations"]
    )
    institutions = models.ManyToManyField(
        "Institution", related_name=related_names["institutions"]
    )
    people = models.ManyToManyField("Person", related_name=related_names["people"])

    slug = AutoSlugField(
        populate_from=["title"],
        slugify_function=slugify_function,
        allow_duplicates=False,
        unique=True,
        max_length=1000,
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Capsule"
        verbose_name_plural = "Capsules"

        ordering = ("-id",)

    def __str__(self):
        return str(self.title)

    def get_processed_status(self):
        if self.status in ("F", "B"):
            datetime_now = timezone.now()

            if datetime_now - self.created_at > timedelta(hours=self.status_duration):
                return "N"

        return self.status


class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True, null=False, blank=False)

    slug = AutoSlugField(
        populate_from=["name"],
        slugify_function=slugify_function,
        allow_duplicates=False,
        unique=True,
        max_length=1000,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"

        ordering = ("name",)

    def __str__(self):
        return self.name


class Location(models.Model):
    name = models.CharField(max_length=255, unique=True, null=False, blank=False)

    slug = AutoSlugField(
        populate_from=["name"],
        slugify_function=slugify_function,
        allow_duplicates=False,
        unique=True,
        max_length=1000,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Location"
        verbose_name_plural = "Locations"

        ordering = ("name",)

    def __str__(self):
        return self.name


class Institution(models.Model):
    name = models.CharField(max_length=255, unique=True, null=False, blank=False)

    slug = AutoSlugField(
        populate_from=["name"],
        slugify_function=slugify_function,
        allow_duplicates=False,
        unique=True,
        max_length=1000,
    )

    description = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Institution"
        verbose_name_plural = "Institutions"

        ordering = ("name",)

    def __str__(self):
        return self.name


class Person(models.Model):
    name = models.CharField(max_length=255, unique=True, null=False, blank=False)

    slug = AutoSlugField(
        populate_from=["name"],
        slugify_function=slugify_function,
        allow_duplicates=False,
        unique=True,
        max_length=1000,
    )

    description = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Person"
        verbose_name_plural = "People"

        ordering = ("name",)

    def __str__(self):
        return self.name
