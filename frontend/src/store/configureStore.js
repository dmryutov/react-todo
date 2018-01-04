import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux'

import { rootReducer } from '../reducers';


const configureStore = () => {
	const store = compose(
		applyMiddleware(thunkMiddleware),
		applyMiddleware(createLogger()),
		applyMiddleware(routerMiddleware(browserHistory))
	)(createStore)(rootReducer);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').rootReducer;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
export default configureStore;