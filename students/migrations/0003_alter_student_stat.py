# Generated by Django 4.2.1 on 2023-05-21 03:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0002_alter_course_pre_courses_alter_student_departments'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='stat',
            field=models.BooleanField(default=True),
        ),
    ]
