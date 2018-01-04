import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from '../containers/User';
import { APP_NAME } from '../constants/App';
import '../styles/Root.scss';


class Root extends Component {
	render() {
		const year = (new Date()).getFullYear();

		return (
			<div>
				{this.props.children}
				<footer>
					<User />
					<p>{`${APP_NAME} ${String.fromCharCode(169)} ${year}`}</p>
				</footer>
			</div>
		);
	}
}

export default connect()(Root);