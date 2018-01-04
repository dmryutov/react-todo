import { push } from 'react-router-redux';

import { sendRequest } from '../utils/ajax';
import * as types from '../constants/User';


export const loadUser = () => {
	return (dispatch) => {
		sendRequest('get', '/api/user/').then(response => {
			dispatch({
				type: types.GET_USER_SUCCESS,
				payload: response.data
			})
		}).catch(error => {
			dispatch({
				type: types.GET_USER_FAIL,
				payload: new Error('Ошибка загрузки информации о пользователе!'),
				error: true
			})
		});
	}
}


export const getToken = (username, password, callback) => {
	sendRequest('post', '/api/obtain-auth-token/', { username, password })
	.then(response => {
		callback({
			authenticated: true,
			token: response.data.token
		})
	}).catch(error => {
		callback({
			authenticated: false,
			error: true
		})
	});
}


export const addUser = (email, username, password) => {
	return (dispatch) => {
		sendRequest('post', '/api/user/add/', { email, username, password })
		.then(response => {
			dispatch(login(username, password));
		}).catch(error => {
			const data = error.response.data;
			const msg = (data.email && `Email: ${data.email[0]}`) ||
						(data.username && `Логин: ${data.username[0]}`) ||
						(data.password && `Пароль: ${data.password[0]}`)
			dispatch({
				type: types.REGISTRATION_FAIL,
				payload: new Error(msg),
				error: true
			})		
		});
	}
}


export const login = (username, password) => {
	return (dispatch) => {
		const url = '/all/';
		if (localStorage.token) {
			dispatch(push(url));
			return;
		}
		getToken(username, password, (res) => {
			if (res.error) {
				dispatch({
					type: types.LOGIN_FAIL,
					payload: new Error('Неправильный логин / пароль!'),
					error: true
				})
			}
			else if (res.authenticated) {
				localStorage.token = res.token;
				dispatch(loadUser());
				dispatch(push(url));
			}
		});
	}
}


export const logout = () => {
	return (dispatch) => {
		delete localStorage.token;

		dispatch({
			type: types.LOGOUT
		});
        dispatch(push('/login/'));
	}
}


export const checkLoggedIn = () => {
	return (dispatch) => {
		if (!localStorage.token)
			dispatch(push('/login/'));
	}
}