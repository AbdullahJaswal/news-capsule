from django.contrib import admin

from .models import Capsule, Institution, Location, Person, Tag

# Register your models here.
admin.site.register(Capsule)
admin.site.register(Tag)
admin.site.register(Location)
admin.site.register(Person)
admin.site.register(Institution)
