from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import *

# Create your views here.

# ajax functions


def get_departments(request):
    level = request.GET.get('level')
    if level in ['1', '2']:
        departments = Department.objects.filter(id='Gen111')
    elif level in ['3', '4']:
        departments = Department.objects.all()
    else:
        departments = []
    data = [{'id': department.pk, 'name': department.name}
            for department in departments]
    return JsonResponse(data, safe=False)

# render functions


def index(request):
    return render(request, 'websites.html')


def students(request):
    return render(request, 'index.html')
