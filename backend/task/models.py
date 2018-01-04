from datetime import date, timedelta

from django.contrib.auth.models import User
from django.db import models

from project.models import Project


DATE_DIFF = {
    0: 'Сегодня',
    1: 'Завтра',
    -1: 'Вчера'
}


class TaskManager(models.Manager):
    def today(self):
        return self.filter(estimate=date.today())

    def tomorrow(self):
        tomorrow = date.today() + timedelta(days=1)
        return self.filter(estimate=tomorrow)


class Task(models.Model):
    objects = TaskManager()

    user = models.ForeignKey(User, related_name='tasks')
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.SET_NULL,
                                default=None, null=True, blank=True)

    title = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    estimate = models.DateField(default=None, null=True, blank=True)
    is_done = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'
        ordering = ['-estimate', 'id']

    def __str__(self):
        return '[{}] {}\n'.format(self.estimate, self.title)

    def is_failed(self):
        return not self.is_done and self.estimate and self.estimate < date.today()

    def human_estimate(self):
        if not self.estimate:
            return ''

        diff = (self.estimate - date.today()).days
        return DATE_DIFF.get(diff, self.estimate.strftime('%d.%m.%Y'))
