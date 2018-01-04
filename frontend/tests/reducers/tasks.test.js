import React from 'react';

import tasks from '../../src/reducers/tasks';
import * as types from '../../src/constants/Task';


describe('Reducers/Tasks', () => {
	const initialState = {
		tasks: [],
		loading: false,
		showDone: false,
		error: ''
	};

	it('NOT_EXISTS', () => {
		const state = tasks(undefined, {
			type: 'NOT_EXISTS'
		});
		expect(state).toEqual(initialState);
	});

	// --- Show done/undone tasks ----
	it('TOGGLE_DONE', () => {
		const state = tasks(initialState, {
			type: types.TOGGLE_DONE
		});
		expect(state).toEqual({
			...initialState,
			showDone: !initialState.showDone
		});
	});

	// --- Get task list ---
	it('GET_TASKS_REQUEST', () => {
		const state = tasks(initialState, {
			type: types.GET_TASKS_REQUEST
		});
		expect(state).toEqual({
			...initialState,
			loading: true,
			error: ''
		});
	});

	it('GET_TASKS_SUCCESS', () => {
		const taskList = [
			{id: 1},
			{id: 2}
		];
		const state = tasks(initialState, {
			type: types.GET_TASKS_SUCCESS,
			payload: taskList
		});
		expect(state).toEqual({
			...initialState,
			tasks: taskList,
			loading: false,
			error: ''
		});
	});

	it('GET_TASKS_FAIL', () => {
		const error = new Error('GET_TASKS_FAIL!');
		const state = tasks(initialState, {
			type: types.GET_TASKS_FAIL,
			payload: error
		});
		expect(state).toEqual({
			...initialState,
			error: error.message
		});
	});

	// --- Add task ---
	it('ADD_TASK_SUCCESS', () => {
		const newTask = {id: 1};
		const state = tasks(initialState, {
			type: types.ADD_TASK_SUCCESS,
			payload: newTask
		});
		expect(state).toEqual({
			...initialState,
			tasks: [newTask],
			error: '',
		});
	});

	it('ADD_TASK_FAIL', () => {
		const error = new Error('ADD_TASK_FAIL!');
		const state = tasks(initialState, {
			type: types.ADD_TASK_FAIL,
			payload: error,
		});
		expect(state).toEqual({
			...initialState,
			error: error.message
		});
	});

	// --- Update task ---
	it('UPDATE_TASK_SUCCESS', () => {
		const newTask = {id: 1, name: 'new'};
		const state = tasks({...initialState, tasks: [{id: 1, name: 'old'}]}, {
			type: types.UPDATE_TASK_SUCCESS,
			payload: newTask
		});
		expect(state).toEqual({
			...initialState,
			tasks: [newTask],
			error: '',
		});
	});

	it('UPDATE_TASK_FAIL', () => {
		const error = new Error('UPDATE_TASK_FAIL!');
		const state = tasks(initialState, {
			type: types.UPDATE_TASK_FAIL,
			payload: error,
		});
		expect(state).toEqual({
			...initialState,
			error: error.message
		});
	});

	// --- Delete task ---
	it('DELETE_TASK_SUCCESS', () => {
		const oldTask = {id: 1};
		const state = tasks({...initialState, tasks: [oldTask]}, {
			type: types.DELETE_TASK_SUCCESS,
			payload: oldTask.id
		});
		expect(state).toEqual({
			...initialState,
			tasks: [],
			error: ''
		});
	});

	it('DELETE_TASK_FAIL', () => {
		const oldTask = {id: 1};
		const error = new Error('DELETE_TASK_FAIL!');
		const state = tasks({...initialState, tasks: [oldTask]}, {
			type: types.DELETE_TASK_FAIL,
			payload: error,
		});
		expect(state).toEqual({
			...initialState,
			error: error.message
		});
	});
});