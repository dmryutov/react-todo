import { sendRequest } from '../utils/ajax';
import * as types from '../constants/Project';


export const loadProjects = () => {
	return (dispatch) => {
		dispatch({
			type: types.GET_PROJECTS_REQUEST,
		});

		sendRequest('get', '/api/projects/').then(response => {
			dispatch({
				type: types.GET_PROJECTS_SUCCESS,
				payload: response.data
			});
		}).catch(error => {
			dispatch({
				type: types.GET_PROJECTS_FAIL,
				payload: new Error('Ошибка загрузки списка проектов!'),
				error: true
			});
		});
	}
}


export const addProject = (data) => {
	return (dispatch) => {
		sendRequest('post', '/api/projects/', data).then(response => {
			dispatch({
				type: types.ADD_PROJECT_SUCCESS,
				payload: response.data
			});
		}).catch(error => {
			dispatch({
				type: types.ADD_PROJECT_FAIL,
				payload: new Error('Ошибка добавления проекта!'),
				error: true
			});
		});
	}
}


export const deleteProject = (id) => {
	return (dispatch) => {
		sendRequest('delete', `/api/projects/${id}/`).then(response => {
			dispatch({
				type: types.DELETE_PROJECT_SUCCESS,
				payload: id
			});
		}).catch(error => {
			dispatch({
				type: types.DELETE_PROJECT_FAIL,
				payload: new Error('Ошибка удаления проекта!'),
				error: true
			});
		});
	}
}