# Generated by Django 4.1.7 on 2023-03-29 16:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("news", "0011_alter_institution_name_alter_location_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="capsule",
            name="people",
            field=models.ManyToManyField(related_name="capsules", to="news.person"),
        ),
    ]