from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from project.models import Project
from task.models import Task


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'slug', 'color']


class TaskSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'estimate', 'human_estimate', 'is_done',
                  'is_failed', 'project']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class CreateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True,
                                   validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=8)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def validate_password(self, value):
        return make_password(value)
