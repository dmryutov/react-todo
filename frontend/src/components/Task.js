import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class Task extends Component {
	handleToggleDoneChange = (e) => {
		this.props.updateTask(this.props.task.id, {
			is_done: e.target.checked
		});
	}
	handleDeleteClick = () => {
		this.props.deleteTask(this.props.task.id);
	}
	render() {
		const { title, human_estimate, is_done, is_failed, project } = this.props.task;
		let classes = {
			'completed': is_done,
			'failed': is_failed
		};

		return (
			<li className={classnames(classes)}>
				<input
					className="toggle"
					type="checkbox"
					checked={is_done}
					onChange={this.handleToggleDoneChange} />
				<label className="title">{title}</label>
				<label className="estimate">{human_estimate}</label>
				<i className={`project-color project-color-${project ? project.color : '0'}`}></i>
				<button
					className="btn-delete"
					onClick={this.handleDeleteClick}></button>
			</li>
		);
	}
}

Task.propTypes = {
	task: PropTypes.object.isRequired,
	updateTask: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired
}

export default Task;