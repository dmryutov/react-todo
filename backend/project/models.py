from unidecode import unidecode

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.template.defaultfilters import slugify


class Project(models.Model):
    user = models.ForeignKey(User, related_name='projects')

    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    color = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(12)],
                                default=1)
    slug = models.SlugField(max_length=100, editable=False)

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'
        unique_together = ['name', 'slug']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(unidecode(self.name))
        super(Project, self).save(*args, **kwargs)
