from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('update-level/', views.update_level, name='update_level'),
    path('students/', views.students, name='students'),
]
