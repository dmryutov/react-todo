import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';


class Project extends Component {
	handleDeleteClick = () => {
		this.props.deleteProject(this.props.project.id);
	}
	render() {
		const { project } = this.props;

		return (
			<li key={project.id}>
				<Link activeClassName="active" to={`/${project.slug}/`}>
					<i className={`project-color project-color-${project.color}`}></i>
					{project.name}
				</Link>
				<button
					className="btn-delete"
					onClick={this.handleDeleteClick}></button>
			</li>
		);
	}
}

Project.propTypes = {
	project: PropTypes.object.isRequired,
	deleteProject: PropTypes.func.isRequired
}

export default Project;