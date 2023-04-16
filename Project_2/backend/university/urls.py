from django.urls import path, include
from rest_framework import routers
from . import views
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


# create and define our router
router = routers.DefaultRouter()
router.register(r'degree', views.DegreeViewSet)
router.register(r'cohort', views.CohortViewSet)
router.register(r'student', views.StudentViewSet)
router.register(r'module', views.ModuleViewSet)
router.register(r'grade', views.GradeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]