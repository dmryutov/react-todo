import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import projects from './projects';
import tasks from './tasks';
import user from './user';


export const rootReducer = combineReducers({
	routing: routerReducer,
	projects,
	tasks,
	user
});