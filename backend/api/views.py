from rest_framework import generics, response
from rest_framework.permissions import IsAuthenticated

from project.models import Project
from task.models import Task
from .serializers import ProjectSerializer, TaskSerializer, UserSerializer, CreateUserSerializer


class ProjectList(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)


class TaskList(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)

    def get_project(self):
        return self.kwargs.get('project', None)

    def perform_create(self, serializer):
        try:
            project = Project.objects.get(slug=self.get_project())
        except Project.DoesNotExist:
            project = None
        serializer.save(user=self.request.user, project=project)

    def get_queryset(self):
        project = self.get_project()
        objects = Task.objects
        if project == 'today':
            objects = objects.today()
        elif project == 'tomorrow':
            objects = objects.tomorrow()
        elif project and project != 'all':
            objects = objects.filter(project__slug=project)
        return objects.filter(user=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


class UserViewSet(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        return response.Response(UserSerializer(request.user, context={'request':request}).data)


class CreateUserViewSet(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
