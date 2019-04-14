import React, { Component } from 'react';

class SelectedCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const showHelpText = !this.props.selected_course;
		const helpText = <p>Click on a class to view more information</p>
		const {id, credits, description, title } = this.props.selected_course || {};
		let prereqText = "None";
		if(this.props.selected_course && this.props.selected_course.prereq) {
			prereqText = this.props.selected_course.prereq.text;
		}
		const courseDescription = (
			<>
				<div><strong>{id}</strong></div>
				<div>{title}</div>
				<div><span>Credits</span> {credits}</div>
				<div><span>Description</span><div className="description">{description}</div></div>
				<div><span>Prereqs</span> {prereqText}</div>
			</>
		)
		return (
			<div className="selected-course">
				{showHelpText ? helpText : courseDescription}
			</div>
		);
	}
}

export default SelectedCourse;