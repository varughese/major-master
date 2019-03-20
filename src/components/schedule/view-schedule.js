import React, { Component } from 'react';
import SemesterViewer from './semester-viewer';
import { Row, Col } from 'reactstrap';

class ViewSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			schedule: []
		};
	}

	render() {
		return (
			<SemesterViewer />
		);
	}
}

export default ViewSchedule;