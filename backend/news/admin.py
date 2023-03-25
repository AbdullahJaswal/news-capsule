from django.contrib import admin

from .models import Article, Author, Category, Content, Organization

# Register your models here.
admin.site.register(Organization)
admin.site.register(Category)
admin.site.register(Article)
admin.site.register(Content)
admin.site.register(Author)
