from django.urls import path

from .views import CapsuleDetailView, CapsuleListView

urlpatterns = [
    path("capsule/", CapsuleListView.as_view(), name="capsule-list"),
    path("capsule/<slug:slug>/", CapsuleDetailView.as_view(), name="capsule-detail"),
]
