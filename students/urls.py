from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_departments/', views.get_departments, name='get_departments'),
    path('students/', views.students, name='students'),
]
