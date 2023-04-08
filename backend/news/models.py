from datetime import timedelta

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from django_extensions.db.fields import AutoSlugField

from utils.slugify_function import slugify_function


# Create your models here.
class Organization(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False, unique=True)
    slug = AutoSlugField(
        populate_from=["name"],
        slugify_function=slugify_function,
        allow_duplicates=False,
        unique=True,
        max_length=1000,
    )

    logo_url = models.URLField(null=True, blank=True, default="")

    description = models.TextField(null=True, blank=True)
    reference = models.CharField(max_length=255, null=True, blank=True)
    reference_url = models.URLField(null=True, blank=True)

    url = models.URLField(null=False, blank=False, unique=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)

    facebook = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    instagram = models.URLField(null=True, blank=True)
    youtube = models.URLField(null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Organization"
        verbose_name_plural = "Organizations"

        ordering = ("name",)

    def __str__(self):
        return str(self.name)


class Category(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    slug = AutoSlugField(
        populate_from=["name"],
        slugify_function=slugify_function,
        allow_duplicates=False,
        unique=True,
        max_length=1000,
    )

    description = models.TextField(null=True, blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

        ordering = ("name",)

    def __str__(self):
        return str(self.name)


class Article(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.PROTECT,
        null=False,
        blank=False,
        related_name="articles",
    )
    categories = models.ManyToManyField(Category, related_name="articles")

    title = models.TextField(null=True, blank=True)
    slug = AutoSlugField(
        populate_from=["organization__name", "title"],
        slugify_function=slugify_function,
        allow_duplicates=False,
        unique=True,
        max_length=1000,
    )

    url = models.URLField(null=True, blank=True, unique=True)
    description = models.TextField(null=True, blank=True)

    content = models.TextField(null=True, blank=True)

    image = models.URLField(null=True, blank=True)
    published_at = models.DateTimeField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_processed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Article"
        verbose_name_plural = "Articles"

        ordering = ("-published_at",)

    def __str__(self):
        return str(self.title)


class Content(models.Model):
    article = models.ForeignKey(
        Article,
        on_delete=models.PROTECT,
        null=False,
        blank=False,
        related_name="contents",
    )

    authors = models.ManyToManyField("Author", related_name="contents")
    images = models.JSONField(null=True, blank=True)
    tweets = models.JSONField(null=True, blank=True)

    content = models.TextField(null=False, blank=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Content"
        verbose_name_plural = "Contents"

        ordering = ("-id",)

    def __str__(self):
        return str(self.article.title)


class Author(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    slug = AutoSlugField(
        populate_from=["name"],
        slugify_function=slugify_function,
        allow_duplicates=False,
        unique=True,
        max_length=1000,
    )

    url = models.URLField(null=True, blank=True, unique=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Author"
        verbose_name_plural = "Authors"

        ordering = ("name",)

    def __str__(self):
        return str(self.name)


class Capsule(models.Model):
    STATUS_CHOICES = (
        ("N", "Normal"),
        ("F", "Featured"),
        ("B", "Breaking"),
    )

    article = models.ForeignKey(
        Article,
        on_delete=models.PROTECT,
        null=False,
        blank=False,
        related_name="capsules",
    )

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

    tags = models.ManyToManyField("Tag", related_name="capsules")
    locations = models.ManyToManyField("Location", related_name="capsules")
    institutions = models.ManyToManyField("Institution", related_name="capsules")
    people = models.ManyToManyField("Person", related_name="capsules")

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


class ArticleSummary(models.Model):
    article = models.ForeignKey(
        Article,
        on_delete=models.PROTECT,
        null=False,
        blank=False,
        related_name="summaries",
    )

    text = models.TextField(null=False, blank=False)

    is_processed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Article Summary"
        verbose_name_plural = "Article Summaries"

        ordering = ("-id",)

    def __str__(self):
        return str(self.title)
