import { sendRequest } from '../utils/ajax';
import * as types from '../constants/Task';


export const toggleDone = () => {
	return (dispatch) => {
		dispatch({
			type: types.TOGGLE_DONE
		});
	}
}


export const loadTasks = (currentProject) => {
	return (dispatch) => {
		dispatch({
			type: types.GET_TASKS_REQUEST,
		});

		sendRequest('get', `/api/tasks/project/${currentProject}/`)
		.then(response => {
			dispatch({
				type: types.GET_TASKS_SUCCESS,
				payload: response.data
			});
		}).catch(error => {
			dispatch({
				type: types.GET_TASKS_FAIL,
				payload: new Error('Ошибка загрузки списка задач!'),
				error: true
			});
		});
	}
}


export const addTask = (currentProject, data) => {
	return (dispatch) => {
		sendRequest('post', `/api/tasks/project/${currentProject}/`, data)
		.then(response => {
			dispatch({
				type: types.ADD_TASK_SUCCESS,
				payload: response.data
			});
		}).catch(error => {
			dispatch({
				type: types.ADD_TASK_FAIL,
				payload: new Error('Ошибка добавления задачи!'),
				error: true
			});
		});
	}
}


export const updateTask = (id, data) => {
	return (dispatch) => {
		sendRequest('patch', `/api/tasks/${id}/`, data).then(response => {
			dispatch({
				type: types.UPDATE_TASK_SUCCESS,
				payload: response.data
			});
		}).catch(error => {
			dispatch({
				type: types.UPDATE_TASK_FAIL,
				payload: new Error('Ошибка обновления задачи!'),
				error: true
			});
		});
	}
}


export const deleteTask = (id) => {
	return (dispatch) => {
		sendRequest('delete', `/api/tasks/${id}/`).then(response => {
			dispatch({
				type: types.DELETE_TASK_SUCCESS,
				payload: id
			});
		}).catch(error => {
			dispatch({
				type: types.DELETE_TASK_FAIL,
				payload: new Error('Ошибка удаления задачи!'),
				error: true
			});
		});
	}
}