import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import SearchCourses from './search-courses';
import RequirementViewer from './requirement-viewer';

class SidePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<>
				<SearchCourses />
				<RequirementViewer />
			</>
		);
	}
}

export default SidePanel;