from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_departments/', views.get_departments, name='get_departments'),
    path('students/', views.students, name='students'),
    path('students/login/', views.loginstd, name='loginstd'), # type: ignore
	path('students/logout/', views.logoutstd, name='logoutstd'),
	path('students/profile/', views.studentProfile, name='profile'),
	path('students/registered-courses/', views.registered, name='registered'),
	path('students/register-courses/', views.register, name='register'),
    path('students/changePassword/', views.changePassword,name='changePassword'), # type: ignore
    path('students/register-courses/submit', views.rg_submit, name='rg_submit') # type: ignore

]
