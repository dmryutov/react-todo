import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../actions/UserActions';


export default (Child) => {
	class RequireAuth extends Component {
		componentWillMount() {
			this.props.userActions.checkLoggedIn();
		}
		componentWillUpdate(nextProps) {
			this.props.userActions.checkLoggedIn();
		}
		render() {
			return <Child {...this.props} />
		}
	}

	const mapDispatchToProps = (dispatch) => {
		return {
			userActions: bindActionCreators(userActions, dispatch)
		};
	}

	return connect(null, mapDispatchToProps)(RequireAuth);
}