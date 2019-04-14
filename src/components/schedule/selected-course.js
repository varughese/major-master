import React, { Component } from 'react';

class SelectedCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="selected-course">
				<p>{JSON.stringify(this.props.selected_course)}</p>
			</div>
		);
	}
}

export default SelectedCourse;