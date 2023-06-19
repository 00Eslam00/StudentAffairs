from xml.dom import ValidationErr
from django.contrib import admin
from django.dispatch import receiver
from django.db.models.signals import post_migrate
from django.forms import TextInput
from .models import *
from django.db import models
from django.urls import path
from django.http import JsonResponse
from django.views.generic.edit import ModelFormMixin
from django.shortcuts import render

# Register your models here.


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    pass

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
	change_form_template = "adminstrator/student.html"
	list_display = ['id', 'name', 'level',
					'departments', 'email', 'gender', 'stat']
	list_display_links = ['id']
	list_editable = ['stat']
	list_filter = ['stat', 'level', 'departments']
	search_fields = ['id', 'name', 'email']

	def add_view(self, request, form_url='', extra_context=None):
		department_exists = Department.objects.filter(
			id='Gen111').exists()

		return super().add_view(request, form_url, extra_context={
			'department_exists': department_exists,
		})

	def change_view(self, request, object_id, form_url='', extra_context=None):
		department_exists = Department.objects.filter(id='Gen111').exists()
		return super().change_view(request, object_id, form_url, extra_context={'department_exists': department_exists, })

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
	list_display = ['id', 'name']
	list_display_links = ['id']
	# list_editable = ['name']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
	change_form_template = "adminstrator/course.html"
	list_display = ['id', 'name', 'level',
					'departments', 'credit']
	list_filter = ['departments']

	# list_display_links = ['id']
	# list_editable = ['name', 'level', 'departments', 'credit']

	def add_view(self, request, form_url='', extra_context=None):
		department_exists = Department.objects.filter(id='Gen111').exists()
		return super().add_view(request, form_url, extra_context={'department_exists':department_exists})

	def change_view(self, request, object_id, form_url='', extra_context=None):
		department_exists = Department.objects.filter(id='Gen111').exists()
		return super().change_view(request, object_id, form_url, extra_context={'department_exists': department_exists, })


@admin.register(StudentCourse)
class StudentCourseAdmin(admin.ModelAdmin):
	list_display = ['student', 'course', 'term','classwork', 'exam_grade']
