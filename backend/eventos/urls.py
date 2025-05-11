from django.urls import path
from django.urls import include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet

router = DefaultRouter()
router.register(r'eventos', EventViewSet, basename='evento')

urlpatterns = [
    path('', include(router.urls)),
]
