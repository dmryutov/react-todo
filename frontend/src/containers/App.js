import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectList from './ProjectList';
import TaskList from './TaskList';
import { APP_NAME } from '../constants/App';


class App extends Component {
	render() {
		return (
			<div>
				<h1>{APP_NAME}</h1>
				<div className="box box-main clearfix">
					<ProjectList />
					<TaskList currentProject={this.props.currentProject} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentProject: ownProps.params.project
	}
}

export default connect(mapStateToProps)(App);