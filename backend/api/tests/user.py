import json

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


class CreateUserTestCase(APITestCase):
    def setUp(self):
        self.url_get = reverse('user_list')
        self.url_add = reverse('add_user')
        self.user = User.objects.create_user('john', 'john@snow.com', 'you_know_nothing')

    def api_authentication(self, user=None):
        key = Token.objects.get(user=user).key if user else ''
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(key))

    def test_get_current_user(self):
        self.api_authentication(self.user)
        response = self.client.get(self.url_get)

        # assert new user was added
        self.assertEqual(User.objects.count(), 1)
        # assert a created status code was returned
        self.assertEqual(200, response.status_code)
        # assert username
        self.assertEqual(json.loads(response.content).get('username'), self.user.username)

    def test_get_user_by_wrong_token(self):
        self.api_authentication()
        response = self.client.get(self.url_get)

        # assert a created status code was returned
        self.assertEqual(401, response.status_code)

    def test_add_user(self):
        response = self.client.post(self.url_add, {
            'username': 'newuser',
            'email': 'new@user.com',
            'password': 'newpassnewpass'
        })

        # assert new user was added
        self.assertEqual(User.objects.count(), 2)
        # assert a created status code was returned
        self.assertEqual(201, response.status_code)

    def test_add_duplicate_user(self):
        response = self.client.post(self.url_add, {
            'username': 'john',
            'email': 'john@snow.com',
            'password': 'you_know_nothing'
        })

        self.assertEqual(400, response.status_code)
