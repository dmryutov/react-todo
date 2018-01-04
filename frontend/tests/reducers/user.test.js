import React from 'react';

import user from '../../src/reducers/user';
import * as types from '../../src/constants/User';


describe('Reducers/User', () => {
	const initialState = {
		user: {},
		error: ''
	};

	it('NOT_EXISTS', () => {
		const state = user(undefined, {
			type: 'NOT_EXISTS'
		});
		expect(state).toEqual(initialState);
	});

	// --- Get user info ---
	it('GET_USER_SUCCESS', () => {
		const testUser = {
			username: 'username'
		};
		const state = user(initialState, {
			type: types.GET_USER_SUCCESS,
			payload: testUser
		});
		expect(state).toEqual({
			...initialState,
			user: testUser,
			error: ''
		});
	});

	it('GET_USER_FAIL', () => {
		const error = new Error('GET_USER_FAIL!');
		const state = user(initialState, {
			type: types.GET_USER_FAIL,
			payload: error
		});
		expect(state).toEqual({
			...initialState,
			error: error.message
		});
	});

	// --- Login ---
	it('LOGIN_FAIL', () => {
		const error = new Error('LOGIN_FAIL!');
		const state = user(initialState, {
			type: types.LOGIN_FAIL,
			payload: error
		});
		expect(state).toEqual({
			...initialState,
			error: error.message
		});
	});

	// --- Registration ---
	it('REGISTRATION_FAIL', () => {
		const error = new Error('REGISTRATION_FAIL!');
		const state = user(initialState, {
			type: types.REGISTRATION_FAIL,
			payload: error
		});
		expect(state).toEqual({
			...initialState,
			error: error.message
		});
	});

	// --- Logout ---
	it('LOGOUT', () => {
		const state = user(initialState, {
			type: types.LOGOUT
		});
		expect(state).toEqual({
			...initialState,
			user: {}
		});
	});
});