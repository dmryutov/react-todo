import json

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from project.models import Project
from api.serializers import ProjectSerializer


class ProjectListTestCase(APITestCase):
    def setUp(self):
        self.url = reverse('project_list')
        self.user = User.objects.create_user('john', 'john@snow.com', 'you_know_nothing')
        self.token = Token.objects.get(user=self.user)
        self.api_authentication()

        Project.objects.create(user=self.user, name='Project 1')

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.token.key))

    def test_create_project(self):
        response = self.client.post(self.url, {
            'name': 'Project 2',
            'color': 4
        })

        # assert new project was added
        self.assertEqual(Project.objects.count(), 2)
        # assert a created status code was returned
        self.assertEqual(201, response.status_code)

    def test_user_project(self):
        """
        Test to verify user project list
        """
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 1)


class ProjectDetailTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user('john', 'john@snow.com', 'you_know_nothing')
        self.token = Token.objects.get(user=self.user)
        self.api_authentication()

        self.project = Project.objects.create(user=self.user, name='Project 1')
        self.url = reverse('project_detail', kwargs={'pk': self.project.pk})

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.token.key))

    def test_get_project(self):
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)

        todo_serializer_data = ProjectSerializer(instance=self.project).data
        self.assertEqual(todo_serializer_data, json.loads(response.content))

    def test_project_update_unauthorized(self):
        new_user = User.objects.create_user('newuser', 'new@user.com', 'newpassnewpass')
        new_token = Token.objects.get(user=new_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(new_token.key))

        # HTTP PUT
        response = self.client.put(self.url, {
            'name': 'Hacked by new user',
            'color': 1
        })
        self.assertEqual(404, response.status_code)  # 403

        # HTTP PATCH
        response = self.client.patch(self.url, {
            'name': 'Hacked by new user',
            'color': 1
        })
        self.assertEqual(404, response.status_code)  # 403

    def test_project_update(self):
        response = self.client.put(self.url, {
            'name': 'Updated project 1',
            'color': 2
        })
        project = Project.objects.get(id=self.project.id)
        self.assertEqual(json.loads(response.content).get('name'), project.name)

    def test_project_partial_update(self):
        response = self.client.patch(self.url, {
            'color': 2
        })
        project = Project.objects.get(id=self.project.id)
        self.assertEqual(json.loads(response.content).get('color'), project.color)

    def test_project_delete_unauthorized(self):
        new_user = User.objects.create_user('newuser', 'new@user.com', 'newpassnewpass')
        new_token = Token.objects.get(user=new_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(new_token.key))

        response = self.client.delete(self.url)
        self.assertEqual(404, response.status_code)  # 403

    def test_project_delete(self):
        response = self.client.delete(self.url)
        self.assertEqual(204, response.status_code)
