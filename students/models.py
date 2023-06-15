from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.


def from_1():

    largest = Student.objects.all().order_by('id').last()
    if not largest:
        return 1
    return largest.id + 1


class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()

    def __str__(self):
        return self.title


class Department(models.Model):
    id = models.CharField(primary_key=True, max_length=20)
    name = models.CharField(max_length=35)

    def __str__(self):
        return self.name


class Course(models.Model):
    id = models.CharField(primary_key=True, max_length=15)
    name = models.CharField(max_length=35)
    level = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(4)], default=1)
    departments = models.ForeignKey(
        Department, on_delete=models.CASCADE)
    credit = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(3)], default=0)
    pre_Courses = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.name


class Student(models.Model):
    id = models.IntegerField(primary_key=True, default=from_1)
    name = models.CharField(max_length=150)
    level = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(4)], default=1)
    departments = models.ForeignKey(
        Department, on_delete=models.CASCADE)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=25, null=True)
    gender = models.CharField(
        max_length=1, default='M', choices=(('M', 'Male'), ('F', 'Female')))
    date_of_birth = models.DateField()
    address = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    stat = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.id}"


class StudentCourse(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    term = models.CharField(
        max_length=1, default='f', choices=(('f', 'First Term'), ('S', 'Second Term')))
    classwork = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True)

    exam_grade = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True)
    # Add any other attributes you want to track here

    def __str__(self):
        return f"{self.student.name} - {self.course.name}"
