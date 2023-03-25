# Generated by Django 4.1.7 on 2023-03-25 19:59

from django.db import migrations
import django_extensions.db.fields


class Migration(migrations.Migration):
    dependencies = [
        ("news", "0003_remove_article_slug_remove_author_slug_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="article",
            name="slug",
            field=django_extensions.db.fields.AutoSlugField(
                blank=True,
                editable=False,
                populate_from=["organization__name", "title"],
                unique=True,
            ),
        ),
        migrations.AddField(
            model_name="author",
            name="slug",
            field=django_extensions.db.fields.AutoSlugField(
                blank=True, editable=False, populate_from=["name"], unique=True
            ),
        ),
        migrations.AddField(
            model_name="category",
            name="slug",
            field=django_extensions.db.fields.AutoSlugField(
                blank=True, editable=False, populate_from=["name"], unique=True
            ),
        ),
        migrations.AddField(
            model_name="organization",
            name="slug",
            field=django_extensions.db.fields.AutoSlugField(
                blank=True, editable=False, populate_from=["name"], unique=True
            ),
        ),
    ]
