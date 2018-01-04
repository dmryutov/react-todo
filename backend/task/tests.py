from datetime import date, timedelta

from django.contrib.auth.models import User
from django.test import TestCase

from .models import Task


class TaskTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('john', 'john@snow.com', 'you_know_nothing')

        today = date.today()
        tomorrow = today + timedelta(days=1)
        other_date = today - timedelta(days=25)
        Task.objects.create(user=self.user, title='Task today', estimate=today)
        Task.objects.create(user=self.user, title='Task tomorrow', estimate=tomorrow)
        Task.objects.create(user=self.user, title='Task other date', estimate=other_date)

    def test_task_str(self):
        task = Task.objects.get(pk=1)
        self.assertEqual(str(task), '[{}] {}\n'.format(task.estimate, task.title))

    def test_today_tasks(self):
        self.assertEqual(Task.objects.today().count(), 1)

    def test_tomorrow_tasks(self):
        self.assertEqual(Task.objects.tomorrow().count(), 1)
