from django.contrib.auth.backends import ModelBackend
from .models import Student

class StudentBackend(ModelBackend):
	def authenticate(self, request, username=None, password=None, **kwargs):
		print(username, password)
		try:
			student = Student.objects.get(id=username)
		except Student.DoesNotExist:
			return None

		if password == student.password:
			return student


	def get_user(self, user_id):
		try:
			return Student.objects.get(pk=user_id)
		except Student.DoesNotExist:
			return None
