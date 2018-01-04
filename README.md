# React-Todo

[![Build Status](https://travis-ci.org/dmryutov/react-todo.svg?branch=master)](https://travis-ci.org/dmryutov/react-todo)
[![Github Releases](https://img.shields.io/github/release/dmryutov/react-todo.svg)](https://github.com/dmryutov/react-todo/releases)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

React-Todo is a simple React/Django task manager with authentication

## Backend:
- Python 3
- Django
- django-rest-framework (DRF)

## Frontend
- React
- React-Router
- Redux
- Babel
- SASS
- Webpack

## Backend Setup 

Clone the repositroy:
```
git clone https://github.com/dmryutov/react-todo/
cd react-todo
```
Install Dependencies:
```
cd backend
pip install -r requirements.txt
```
Make Migrations:
```
./manage.py makemigrations
./manage.py migrate
```
Start server for your REST-API:
```
./manage.py runserver
```

## Frontend Setup:
Go to root and Open another terminal window
```
cd frontend
```
Install Dependencies:
```
npm install
```
Run Server:-
```
npm start
```
To see live application open http://localhost:8000 in your browser window

## Thanks
[Berwin](https://github.com/berwin/learn-react) for beautiful application template
