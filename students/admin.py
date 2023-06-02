from django.contrib import admin
from django.dispatch import receiver
from django.db.models.signals import post_migrate
from django.forms import TextInput
from .models import *
from django.db import models
from django.urls import path
from django.http import JsonResponse
from django.views.generic.edit import ModelFormMixin
# Register your models here.


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    change_form_template = "adminstrator/student.html"
    list_display = ['id', 'name', 'level',
                    'departments', 'email', 'gender', 'stat']
    list_display_links = ['id']
    list_editable = ['name', 'level', 'departments', 'email', 'gender', 'stat']


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['id']
    list_editable = ['name']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    change_form_template = "adminstrator/course.html"
    list_display = ['id', 'name', 'level',
                    'departments', 'credit']
    list_display_links = ['id']
    list_editable = ['name', 'level', 'departments', 'credit']


@admin.register(StudentCourse)
class StudentCourseAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'term', 'exam_grade')

# class MyAdminSite(admin.AdminSite):
#     def index(self, request, extra_context=None):
#         dept, created = Department.objects.get_or_create(
#             id='Gen', name='General')
#         return super().index(request, extra_context)


# admin_site = MyAdminSite()
