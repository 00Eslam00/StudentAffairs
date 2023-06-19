from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from .models import *
from django.contrib.auth import authenticate, login
from .backends import StudentBackend
from django.contrib.auth.decorators import login_required


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



#helper functions
def islogin(request):
	try:
		usernamec =  request.COOKIES.get('username')
		passwordc = request.COOKIES.get('password')

		std = Student.objects.get(id=int(usernamec))
		username = str(std.id)
		password = std.password
		print(username, usernamec, password, passwordc)
		if usernamec == username and passwordc == password:

			return True
	except Exception as e:

		return False
	else:

		return False

def getusername(request):
	return request.COOKIES.get('username')


def calculate_grade(score):
	if score >= 90:
		return "A+"
	elif score >= 80:
		return "A"
	elif score >= 70:
		return "B"
	elif score >= 60:
		return "C"
	elif score >= 50:
		return "D"
	else:
		return "F"


def gettotalhours(stdid):
	crss = StudentCourse.objects.filter(student=stdid)
	totalh = 0
	for crs in crss:

		crswork = crs.classwork
		crsexam = crs.exam_grade
		if not(crswork == None or crsexam == None):
			totalh += crs.course.credit
	return totalh


def gettotalgpa(stdid):
	crss = StudentCourse.objects.filter(student=stdid)
# render functions


def index(request):
	return render(request, 'websites.html')


def students(request):
	if islogin(request):
		return render(request, 'index.html', {'nav': 'navbar-student.html'})
	else:
		return render(request, 'index.html', {'nav':'navbar-login.html'})

def loginstd(request):
	if request.method == 'POST':
		res = None
		username = request.POST['username']
		password = request.POST['password']

		try:
			username = int(username)
			std = Student.objects.get(id=username)
			if std.id == username and std.password == password:
				print("not null")

				res = redirect('/students/')
				res.set_cookie('username', str(username))
				res.set_cookie('password', password)
				return res
			else:
				res = render(request, 'login.html', {'error': "userid doesn't match password"})
				return res
		except Exception as e:
			print(e)
			return render(request, 'login.html', {'error': "userid doesn't match password"})

	elif islogin(request):
		return redirect('/students/')
	else:
		print("here")
		return render(request, 'login.html')


def logoutstd(request):
	print("loginig out")
	res = redirect('/students/login')
	res.delete_cookie('username')
	res.delete_cookie('password')
	return res


def studentProfile(request):
	if islogin(request):
		myid = int(getusername(request))
		std = Student.objects.get(id=myid)
		context = {
			'student':std
		}
		if request.method == 'POST':
			mail = request.POST.get('stud_email')
			mobile = request.POST.get('stud_mobile')
			std.email = mail
			std.phone = mobile
			std.save()
			return redirect(request.path)

		# Render the search form template
		return render(request,'student-profile.html',context)
	else:
		return redirect('/students/login')

def registered(request):
	myid = int(getusername(request))
	crss = StudentCourse.objects.filter(student=myid)
	allcourses = []
	for crs in crss:
		crsid = crs.course.id
		crsname = crs.course.name
		crscredit = crs.course.credit
		crswork = crs.classwork
		crsexam = crs.exam_grade
		if crswork == None or crsexam == None:
			crstotal = None
			crsgrade = None
		else:
			crstotal = int(crswork)+int(crsexam) # type: ignore
			crsgrade = calculate_grade(crstotal)

		crslevel = crs.course.level
		allcourses.append({'id':crsid, 'name':crsname, 'credit':crscredit, 'work':crswork, 'exam':crsexam, 'total':crstotal, 'grade': crsgrade, 'level': crslevel})

	print(crss)
	return render(request, "registered-courses.html", {'courses':allcourses })


def changePassword(request):
	res = render(request,'change-password.html')
	if request.method == 'POST':
		oldPass = request.POST.get('old-pass')
		stID = int(getusername(request))
		st = Student.objects.get(id=stID)
		if st.password == oldPass and request.POST.get('new-pass') == request.POST.get('confirm-pass'):
			st.password = request.POST.get('new-pass')
			res.set_cookie('password', request.POST.get('new-pass'))
			st.save()
		return res
	else:
		return res

def isTalken(course, stdCrs):
	for c in stdCrs:
		if course == c.course:
			return True
	return False

def filterCourses(courses, std, stdCrs):
	finalCourses = []
	print(courses)
	# print("Student Courses: ")
	# for s in stdCrs:
	# 	print("Here: ")
	# 	print(s.course)
	# print(stdCrs)
	for crs in courses:
		flag = True
		precrs = crs.pre_Courses.all()
		# print("Cours: ")
		# print(crs)
		# print("Pre Courses: ")
		# print(precrs)
		# print()
		for pcrs in precrs:
			isHere = False
			# print("Inside for----------------------")
			# print(pcrs)
			for scrs in stdCrs:
				if scrs.course == pcrs:
					isHere = True
					# print("Inside if--------------------")
					# print("Cours: ")
					# print(crs)
					# print("Pre Course: ")
					# print(pcrs)
			if not isHere:
				flag = False
				break
		if flag and not isTalken(crs, stdCrs):
			# print(crs)
			finalCourses.append(crs)

	# for crs in finalCourses:
	# 	print(crs)
	return finalCourses




def register(request):
	stdID = int(getusername(request))
	std = Student.objects.get(id=stdID)
	stdCrs = StudentCourse.objects.filter(student=stdID)
	availabeCourses = Course.objects.filter(level__range = [1, std.level], 
					 departments__in = ['Gen111' , std.departments])
	
	availabeCourses = filterCourses(availabeCourses, std, stdCrs)
	# print("Available Courses: ")
	# print(availabeCourses)
	context = {
		'courses': availabeCourses,
	}

	if request.method == 'GET':
		selectedCrs = request.GET.getlist('rg-courses')
		print("Selected Options: ")
		print(selectedCrs)
	else:
		selectedCrs = []
	
	# for crs in selectedCrs:
	# 	sc = StudentCourse(student=stdID,course=crs)
	# 	sc.save()
	return render(request, 'register-courses.html', context)

