import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as taskActions from '../actions/TaskActions';
import Task from '../components/Task';
import AddTask from '../components/AddTask';
import Loader from '../components/Loader';
import '../styles/Task.scss';


class TaskList extends Component {
	componentDidMount() {
		this.props.taskActions.loadTasks(this.props.currentProject);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.currentProject !== nextProps.currentProject)
			this.props.taskActions.loadTasks(nextProps.currentProject);
	}
	render() {
		const { toggleDone, addTask, updateTask, deleteTask } = this.props.taskActions;
		const currentProject = this.props.currentProject;
		let { tasks, loading, showDone, error } = this.props.tasks;
		tasks = tasks.filter(task => task.is_done === showDone);

		let template;
		if (error)
			template = (<div className="error">{error}</div>);
		else if (loading)
			template = (<Loader />);
		else
			template = (
				<ul className="task-list">
					{tasks.map(task =>
						<Task
							key={task.id}
							task={task}
							deleteTask={deleteTask}
							updateTask={updateTask} />
					)}
				</ul>
			);

		return (
			<div id="list-container">
				<div className="list-header">
					<AddTask
						addTask={addTask}
						currentProject={currentProject} />
				</div>
				{template}
				<div className="list-footer">
					<button onClick={toggleDone}>
						Показать {showDone ? 'незавершенные' : 'завершенные'}
					</button>
				</div>
			</div>
		);
	}
}

TaskList.propTypes = {
	currentProject: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		taskActions: bindActionCreators(taskActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);