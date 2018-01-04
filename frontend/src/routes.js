import React from 'react';
import { Route, Redirect } from 'react-router';

import RequireAuth from './containers/RequireAuth';
import Root from './containers/Root';
import App from './containers/App';
import Login from './containers/Login';
import Registration from './containers/Registration';


export const routes = (
	<div>
		<Route path='Root' component={Root}>
			<Route path='/login/' component={Login} />
			<Route path='/registration/' component={Registration} />
			<Route path="/:project([^/]+)/" component={RequireAuth(App)} />
			<Redirect exact from="/" to="/all/" />
		</Route>
	</div>
);