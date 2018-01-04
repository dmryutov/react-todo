import * as types from '../constants/Task';


const initialState = {
	tasks: [],
	loading: false,
	showDone: false,
	error: ''
};

const tasks = (state=initialState, action) => {
	switch (action.type) {
		// --- Show done/undone tasks ----
		case types.TOGGLE_DONE:
			return {
				...state,
				showDone: !state.showDone
			};
		// --- Get task list ---
		case types.GET_TASKS_REQUEST:
			return {
				...state,
				loading: true,
				error: ''
			};
		case types.GET_TASKS_SUCCESS:
			return {
				...state,
				tasks: action.payload,
				loading: false,
				error: ''
			};
		case types.GET_TASKS_FAIL:
			return {
				...state,
				error: action.payload.message,
				loading: false
			};
		// --- Add task ---
		case types.ADD_TASK_SUCCESS: {
			let tasks = state.tasks;
			tasks.push(action.payload);

			return {
				...state,
				tasks,
				error: ''
			};
		}
		case types.ADD_TASK_FAIL:
			return {
				...state,
				error: action.payload.message,
			};
		// --- Update task ---
		case types.UPDATE_TASK_SUCCESS: {
			let tasks = state.tasks;
			tasks[tasks.findIndex(task => task.id === action.payload.id)] = action.payload;

			return {
				...state,
				tasks,
				error: ''
			};
		}
		case types.UPDATE_TASK_FAIL:
			return {
				...state,
				error: action.payload.message,
			};
		// --- Delete task ---
		case types.DELETE_TASK_SUCCESS: {
			let tasks = state.tasks.filter(task => task.id !== action.payload);

			return {
				...state,
				tasks,
				error: ''
			};
		}
		case types.DELETE_TASK_FAIL:
			return {
				...state,
				error: action.payload.message,
			};
		default:
			return state;
	}
}
export default tasks;