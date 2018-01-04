import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ColorPicker from './ColorPicker';


class AddProject extends Component {
	state = {
		color: 1,
	}
	handleAddClick = () => {
		const name = this.projectName.value;
		const color = this.state.color;
		if (name) {
			this.props.addProject({ name, color });
			this.projectName.value = '';
		}
	}
	handleTitleKeyUp = (e) => {
		if (e.keyCode === 13)
			this.handleAddClick();
	}
	handleColorChange = (index) => {
		this.setState({
			color: index
		});
	}
	render() {
		return (
			<div id="add-project">
				<ColorPicker colorChange={this.handleColorChange} />
				<input
					type="text"
					className="add-input"
					id="task-title"
					placeholder="Проект"
					onKeyUp={this.handleTitleKeyUp}
					ref={ref => this.projectName = ref} />
				<button
					className="btn-add"
					onClick={this.handleAddClick}></button>
			</div>
		);
	}
}

AddProject.propTypes = {
	addProject: PropTypes.func.isRequired
}

export default AddProject;