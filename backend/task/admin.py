from django.contrib import admin

from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'project', 'created', 'estimate', 'is_done']

    class Meta:
        model = Task
