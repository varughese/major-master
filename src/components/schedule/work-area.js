import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import SemesterViewer from './semester-viewer';
import ControlBar from './control-bar';

class WorkArea extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<>
				<SemesterViewer />
				<ControlBar />
			</>
		);
	}
}

export default WorkArea;