from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

# Create your views here.


def index(request):
    return render(request, 'websites.html')


def update_level(request):
    level = request.GET.get('level')
    # Do something with the new level value, for example print a message
    print("Hello, level has changed to", level)
    return JsonResponse({'status': 'ok'})

def students(request):
    return render(request,'index.html')
