import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as userActions from '../actions/UserActions';


class User extends Component {
	componentDidMount() {
		this.props.userActions.loadUser();
	}
	render() {
		const { logout } = this.props.userActions;
		const { username } = this.props.user.user;

		let template;
		if (username)
			template = (
				<p>
					Вы вошли как <u>{username}</u>{' | '}
					<button onClick={logout}>Выйти</button>
				</p>
			);
		else
			template = (
				<p>
					<Link to="/login/">Войти</Link>{' | '}
					<Link to="/registration/">Регистрация</Link>
				</p>
			);

		return template;
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		userActions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(User);