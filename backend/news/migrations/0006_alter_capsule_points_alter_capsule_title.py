# Generated by Django 4.1.7 on 2023-03-25 22:00

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("news", "0005_capsule"),
    ]

    operations = [
        migrations.AlterField(
            model_name="capsule",
            name="points",
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name="capsule",
            name="title",
            field=models.CharField(max_length=1000),
        ),
    ]
