# Generated by Django 4.1.7 on 2023-03-25 22:02

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("news", "0006_alter_capsule_points_alter_capsule_title"),
    ]

    operations = [
        migrations.AddField(
            model_name="article",
            name="is_processed",
            field=models.BooleanField(default=False),
        ),
    ]
