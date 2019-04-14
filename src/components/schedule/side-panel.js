import React, { Component } from 'react';
// import { Row, Col } from 'reactstrap';
import SearchCourses from './search-courses';
import SelectedCourse from './selected-course';

class SidePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<>
				<SearchCourses course_list={this.props.course_list} />
				<SelectedCourse selected_course={this.props.currentCourse} />
			</>
		);
	}
}

export default SidePanel;