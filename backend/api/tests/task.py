from datetime import date, timedelta
import json

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from project.models import Project
from task.models import Task
from api.serializers import TaskSerializer


class TaskListTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user('john', 'john@snow.com', 'you_know_nothing')
        self.token = Token.objects.get(user=self.user)
        self.api_authentication()

        self.project = Project.objects.create(user=self.user, name='Project 1')
        self.url = reverse('task_list', kwargs={'project': self.project.slug})

        self.today = date.today()
        self.tomorrow = self.today + timedelta(days=1)
        Task.objects.create(user=self.user, title='Task 1', project=self.project)
        Task.objects.create(user=self.user, title='Task today', estimate=self.today)
        Task.objects.create(user=self.user, title='Task tomorrow', estimate=self.tomorrow)

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.token.key))

    def test_create_task(self):
        response = self.client.post(self.url, {
            'title': 'Task 2',
            'estimate': '2017-12-27'
        })

        # assert new task was added
        self.assertEqual(Task.objects.count(), 4)
        # assert a created status code was returned
        self.assertEqual(201, response.status_code)

    def test_create_task_wrong_project(self):
        url = reverse('task_list', kwargs={'project': 'wrong-slug'})
        response = self.client.post(url, { 'title': 'Task 2' })

        # assert new task was added
        self.assertEqual(Task.objects.count(), 4)
        # assert a created status code was returned
        self.assertEqual(201, response.status_code)

    def test_user_task(self):
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 1)

    def test_get_today_tasks(self):
        url = reverse('task_list', kwargs={'project': 'today'})
        response = self.client.get(url)
        self.assertEqual(len(response.data), 1)

    def test_get_tomorrow_tasks(self):
        url = reverse('task_list', kwargs={'project': 'tomorrow'})
        response = self.client.get(url)
        self.assertEqual(len(response.data), 1)


class TaskDetailTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user('john', 'john@snow.com', 'you_know_nothing')
        self.token = Token.objects.get(user=self.user)
        self.api_authentication()

        self.project = Project.objects.create(user=self.user, name='Project 1')
        self.task = Task.objects.create(user=self.user, title='Task 1', project=self.project)
        self.url = reverse('task_detail', kwargs={'pk': self.task.pk})

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.token.key))

    def test_get_task(self):
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)

        todo_serializer_data = TaskSerializer(instance=self.task).data
        self.assertEqual(todo_serializer_data, json.loads(response.content))

    def test_task_update_unauthorized(self):
        new_user = User.objects.create_user('newuser', 'new@user.com', 'newpassnewpass')
        new_token = Token.objects.get(user=new_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(new_token.key))
        new_project = Project.objects.create(user=new_user, name='New user project')

        # HTTP PUT
        response = self.client.put(self.url, {
            'project': new_project.slug,
            'title': 'Hacked by new user',
            'estimate': '2017-12-27'
        })
        self.assertEqual(404, response.status_code)  # 403

        # HTTP PATCH
        response = self.client.patch(self.url, {
            'project': new_project.slug,
            'title': 'Hacked by new user',
            'estimate': '2017-12-27'
        })
        self.assertEqual(404, response.status_code)  # 403

    def test_task_update(self):
        response = self.client.put(self.url, {
            'project': self.project,
            'title': 'Updated task',
            'estimate': '2017-11-30'
        })
        task = Task.objects.get(id=self.task.id)
        self.assertEqual(json.loads(response.content).get('title'), task.title)

    def test_task_partial_update(self):
        response = self.client.patch(self.url, {
            'estimate': '2017-11-30'
        })
        task = Task.objects.get(id=self.task.id)
        self.assertEqual(json.loads(response.content).get('estimate'), task.estimate.strftime('%Y-%m-%d'))

    def test_task_delete_unauthorized(self):
        new_user = User.objects.create_user('newuser', 'new@user.com', 'newpassnewpass')
        new_token = Token.objects.get(user=new_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(new_token.key))

        response = self.client.delete(self.url)
        self.assertEqual(404, response.status_code)  # 403

    def test_project_delete(self):
        response = self.client.delete(self.url)
        self.assertEqual(204, response.status_code)
