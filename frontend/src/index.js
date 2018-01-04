import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
// import { createBrowserHistory } from 'history';

import { routes } from './routes';
import configureStore from './store/configureStore';
// import registerServiceWorker from './registerServiceWorker';


const store = configureStore();
// const history = syncHistoryWithStore(createBrowserHistory(), store);
const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={history} children={routes} />
	</Provider>,
	document.getElementById('app')
);
// registerServiceWorker();
