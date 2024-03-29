# Generated by Django 4.1.7 on 2023-04-02 15:33

import django.core.validators
from django.db import migrations, models
import django_extensions.db.fields


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("news", "0015_articlesummary"),
    ]

    operations = [
        migrations.CreateModel(
            name="Institution",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, unique=True)),
                (
                    "slug",
                    django_extensions.db.fields.AutoSlugField(
                        blank=True,
                        editable=False,
                        max_length=1000,
                        populate_from=["name"],
                        unique=True,
                    ),
                ),
                ("description", models.TextField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Institution",
                "verbose_name_plural": "Institutions",
                "ordering": ("name",),
            },
        ),
        migrations.CreateModel(
            name="Location",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, unique=True)),
                (
                    "slug",
                    django_extensions.db.fields.AutoSlugField(
                        blank=True,
                        editable=False,
                        max_length=1000,
                        populate_from=["name"],
                        unique=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Location",
                "verbose_name_plural": "Locations",
                "ordering": ("name",),
            },
        ),
        migrations.CreateModel(
            name="Person",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, unique=True)),
                (
                    "slug",
                    django_extensions.db.fields.AutoSlugField(
                        blank=True,
                        editable=False,
                        max_length=1000,
                        populate_from=["name"],
                        unique=True,
                    ),
                ),
                ("description", models.TextField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Person",
                "verbose_name_plural": "People",
                "ordering": ("name",),
            },
        ),
        migrations.CreateModel(
            name="Tag",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, unique=True)),
                (
                    "slug",
                    django_extensions.db.fields.AutoSlugField(
                        blank=True,
                        editable=False,
                        max_length=1000,
                        populate_from=["name"],
                        unique=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Tag",
                "verbose_name_plural": "Tags",
                "ordering": ("name",),
            },
        ),
        migrations.CreateModel(
            name="Capsule",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=1000)),
                (
                    "status",
                    models.CharField(
                        choices=[("N", "Normal"), ("F", "Featured"), ("B", "Breaking")],
                        default="N",
                        max_length=1,
                    ),
                ),
                (
                    "status_duration",
                    models.IntegerField(
                        blank=True,
                        default=None,
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(1),
                            django.core.validators.MaxValueValidator(48),
                        ],
                    ),
                ),
                ("sentiment", models.IntegerField(blank=True, null=True)),
                ("points", models.JSONField(default=list)),
                (
                    "slug",
                    django_extensions.db.fields.AutoSlugField(
                        blank=True,
                        editable=False,
                        max_length=1000,
                        populate_from=["title"],
                        unique=True,
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "articles",
                    models.ManyToManyField(
                        related_name="capsule_capsules", to="news.article"
                    ),
                ),
                (
                    "institutions",
                    models.ManyToManyField(
                        related_name="capsule_institutions", to="capsule.institution"
                    ),
                ),
                (
                    "locations",
                    models.ManyToManyField(
                        related_name="capsule_locations", to="capsule.location"
                    ),
                ),
                (
                    "people",
                    models.ManyToManyField(
                        related_name="capsule_people", to="capsule.person"
                    ),
                ),
                (
                    "tags",
                    models.ManyToManyField(
                        related_name="capsule_tags", to="capsule.tag"
                    ),
                ),
            ],
            options={
                "verbose_name": "Capsule",
                "verbose_name_plural": "Capsules",
                "ordering": ("-id",),
            },
        ),
    ]
