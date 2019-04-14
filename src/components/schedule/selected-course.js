import React, { Component } from 'react';

class SelectedCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const showHelpText = !this.props.selected_course;
		const helpText = <p>Click on a class to view more information</p>
		const courseDescription = <p>{JSON.stringify(this.props.selected_course)}</p>
		return (
			<div className="selected-course">
				{showHelpText ? helpText : courseDescription}
			</div>
		);
	}
}

export default SelectedCourse;