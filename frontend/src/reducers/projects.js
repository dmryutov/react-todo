import * as types from '../constants/Project';


const initialState = {
	projects: [],
	loading: false,
	error: ''
};

const projects = (state=initialState, action) => {
	switch (action.type) {
		// --- Get project list ---
		case types.GET_PROJECTS_REQUEST:
			return {
				...state,
				loading: true,
				error: ''
			};
		case types.GET_PROJECTS_SUCCESS:
			return {
				...state,
				projects: action.payload,
				loading: false,
				error: ''
			};
		case types.GET_PROJECTS_FAIL:
			return {
				...state,
				error: action.payload.message,
				loading: false
			};
		// --- Add project ---
		case types.ADD_PROJECT_SUCCESS: {
			let projects = state.projects;
			projects.push(action.payload);

			return {
				...state,
				projects,
				error: ''
			};
		}
		case types.ADD_PROJECT_FAIL:
			return {
				...state,
				error: action.payload.message,
			};
		// --- Delete project ---
		case types.DELETE_PROJECT_SUCCESS: {
			let projects = state.projects.filter(project => project.id !== action.payload);

			return {
				...state,
				projects,
				error: ''
			};
		}
		case types.DELETE_PROJECT_FAIL:
			return {
				...state,
				error: action.payload.message,
			};
		default:
			return state;
	}
}
export default projects;