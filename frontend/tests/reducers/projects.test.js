import React from 'react';

import projects from '../../src/reducers/projects';
import * as types from '../../src/constants/Project';


describe('Reducers/Projects', () => {
	const initialState = {
		projects: [],
		loading: false,
		error: ''
	};

	it('NOT_EXISTS', () => {
		const state = projects(undefined, {
			type: 'NOT_EXISTS'
		});
		expect(state).toEqual(initialState);
	});

	// --- Get project list ---
	it('GET_PROJECTS_REQUEST', () => {
		const state = projects(initialState, {
			type: types.GET_PROJECTS_REQUEST
		});
		expect(state).toEqual({
			...initialState,
			loading: true,
			error: ''
		});
	});

	it('GET_PROJECTS_SUCCESS', () => {
		const projectList = [
			{id: 1},
			{id: 2}
		];
		const state = projects(initialState, {
			type: types.GET_PROJECTS_SUCCESS,
			payload: projectList
		});
		expect(state).toEqual({
			...initialState,
			projects: projectList,
			loading: false,
			error: ''
		});
	});

	it('GET_PROJECTS_FAIL', () => {
		const error = new Error('GET_PROJECTS_FAIL!');
		const state = projects(initialState, {
			type: types.GET_PROJECTS_FAIL,
			payload: error
		});
		expect(state).toEqual({
			...initialState,
			loading: false,
			error: error.message
		});
	});

	// --- Add project ---
	it('ADD_PROJECT_SUCCESS', () => {
		const newProject = {id: 1};
		const state = projects(initialState, {
			type: types.ADD_PROJECT_SUCCESS,
			payload: newProject
		});
		expect(state).toEqual({
			...initialState,
			projects: [newProject],
			error: ''
		});
	});

	it('ADD_PROJECT_FAIL', () => {
		const error = new Error('ADD_PROJECT_FAIL!');
		const state = projects(initialState, {
			type: types.ADD_PROJECT_FAIL,
			payload: error,
			error: true
		});
		expect(state).toEqual({
			...initialState,
			error: error.message
		});
	});

	// --- Delete project ---
	it('DELETE_PROJECT_SUCCESS', () => {
		const oldProject = {id: 1};
		const state = projects({...initialState, projects: [oldProject]}, {
			type: types.DELETE_PROJECT_SUCCESS,
			payload: oldProject.id
		});
		expect(state).toEqual({
			...initialState,
			projects: [],
			error: ''
		});
	});

	it('DELETE_PROJECT_FAIL', () => {
		const oldProject = {id: 1};
		const error = new Error('DELETE_PROJECT_FAIL!');
		const state = projects({...initialState, projects: [oldProject]}, {
			type: types.DELETE_PROJECT_FAIL,
			payload: error,
			error: true
		});
		expect(state).toEqual({
			...initialState,
			error: error.message
		});
	});
});