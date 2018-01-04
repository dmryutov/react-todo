from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug', 'created', 'color']

    class Meta:
        model = Project
