import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { GithubPicker } from 'react-color';


class ColorPicker extends React.Component {
	state = {
		displayColorPicker: false,
		color: 0,
	}
	colors = [
		'#cccccc', '#95ef63', '#ff8581', '#ffc471', '#f9ec75', '#a8c8e4',
		'#d2b8a3', '#e2a8e4', '#fb886e', '#ffcc00', '#74e8d3', '#3bd5fb'
	]
	handleClick = () => {
		this.setState({
			displayColorPicker: !this.state.displayColorPicker
		});
	}
	handleClose = () => {
		this.setState({
			displayColorPicker: false
		});
	}
	handleChange = (color) => {
		const index = this.colors.findIndex(item => item === color.hex);
		this.setState({
			color: index,
			displayColorPicker: false
		});
		this.props.colorChange(index + 1);
	}
	render() {
		const styles = reactCSS({
			'default': {
				color: {
					width: '13px',
					height: '13px',
					borderRadius: '2px',
					background: this.colors[this.state.color],
				},
				swatch: {
					padding: '3px',
					background: '#fff',
					borderRadius: '1px',
					boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
					display: 'inline-block',
					cursor: 'pointer',
				},
				popover: {
					position: 'absolute',
					zIndex: '2',
				},
				cover: {
					position: 'fixed',
					top: '0px',
					right: '0px',
					bottom: '0px',
					left: '0px',
				},
			},
		});

		return (
			<div className="colorPicker">
				<div
					className="openPicker"
					style={styles.swatch}
					onClick={this.handleClick}>
					<div style={styles.color} />
				</div>
				{this.state.displayColorPicker ?
					<div style={styles.popover}>
						<div
							className="closePicker"
							style={styles.cover}
							onClick={this.handleClose} />
						<GithubPicker
							color={this.colors[this.state.color]}
							colors={this.colors}
							onChange={this.handleChange} />
					</div>
					: null
				}
			</div>
		);
	}
}

ColorPicker.propTypes = {
	colorChange: PropTypes.func.isRequired
}

export default ColorPicker;