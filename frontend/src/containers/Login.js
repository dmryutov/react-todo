import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../actions/UserActions';
import '../styles/Login.scss';


class Login extends Component {
	handleSubmit = (e) => {
		e.preventDefault();

		let username = this.username.value;
		let pass = this.password.value;
		this.props.userActions.login(username, pass);
	}
	render() {
		const { error } = this.props.user;

		return (
			<div>
				<h1>Авторизация</h1>
				<div className="box box-login clearfix">
					{error ?
						<p className="error">{error}</p>
					: ''}
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							className="add-input"
							placeholder="Логин"
							ref={ref => this.username = ref} />
						<input
							type="password"
							className="add-input"
							placeholder="Пароль"
							ref={ref => this.password = ref} />
						<input
							type="submit"
							className="login-button"
							value="Войти" />
					</form>
				</div>
			</div>
		);
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);