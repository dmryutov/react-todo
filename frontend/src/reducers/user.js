import * as types from '../constants/User';


const initialState = {
	user: {},
	error: ''
};

const user = (state=initialState, action) => {
	switch (action.type) {
		// --- Get user info ---
		case types.GET_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				error: ''
			};
		case types.GET_USER_FAIL:
			return {
				...state,
				error: action.payload.message,
			};
		// --- Login ---
		case types.LOGIN_FAIL:
			return {
				...state,
				error: action.payload.message,
			};
		// --- Registration ---
		case types.REGISTRATION_FAIL:
			return {
				...state,
				error: action.payload.message,
			};
		// --- Logout ---
		case types.LOGOUT:
			return {
				...state,
				user: {},
			};
		default:
			return state;
	}
}
export default user;