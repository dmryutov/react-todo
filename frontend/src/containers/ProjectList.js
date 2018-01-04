import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as projectActions from '../actions/ProjectActions';
import Project from '../components/Project';
import AddProject from '../components/AddProject';
import Loader from '../components/Loader';
import '../styles/Project.scss';


class ProjectList extends Component {
	componentDidMount() {
		this.props.projectActions.loadProjects();
	}
	render() {
		const { addProject, deleteProject } = this.props.projectActions;
		const { projects, loading, error } = this.props.projects;

		let template;
		if (error)
			template = (<div className="error">{error}</div>);
		else if (loading)
			template = (<Loader />);
		else
			template = (
				<ul>
					{projects.map(project =>
						<Project
							key={project.id}
							project={project}
							deleteProject={deleteProject} />
					)}
				</ul>
			);

		return (
			<div id="project-container">
				<div id="project-list">
					<ul>
						<li><Link activeClassName="active" to="/all/">Все задачи</Link></li>
						<li><Link activeClassName="active" to="/today/">Сегодня</Link></li>
						<li><Link activeClassName="active" to="/tomorrow/">Завтра</Link></li>
					</ul>
					<hr />
					{template}
				</div>
				<AddProject addProject={addProject} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		projects: state.projects
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		projectActions: bindActionCreators(projectActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
