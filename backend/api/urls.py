from django.conf.urls import url

from rest_framework.authtoken.views import obtain_auth_token

from . import views


urlpatterns = [
    url(r'^projects/$', views.ProjectList.as_view(), name='project_list'),
    url(r'^projects/(?P<pk>[0-9]+)/$', views.ProjectDetail.as_view(), name='project_detail'),
    url(r'^tasks/project/(?P<project>[^/]+)/$', views.TaskList.as_view(), name='task_list'),
    url(r'^tasks/(?P<pk>[0-9]+)/$', views.TaskDetail.as_view(), name='task_detail'),

    url(r'^user/$', views.UserViewSet.as_view(), name='user_list'),
    url(r'^user/add/$', views.CreateUserViewSet.as_view(), name='add_user'),
    url(r'^obtain-auth-token/$', obtain_auth_token, name='obtain_auth_token'),
]
