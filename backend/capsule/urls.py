from django.urls import path

from .views import CapsuleDetailView, CapsuleListView

app_name = "capsule"

urlpatterns = [
    path("", CapsuleListView.as_view(), name="capsule-list"),
    path("<slug:slug>/", CapsuleDetailView.as_view(), name="capsule-detail"),
]
