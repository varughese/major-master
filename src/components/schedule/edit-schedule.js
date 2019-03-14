import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import SidePanel from './side-panel';
import WorkArea from './work-area';

class EditSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			schedule: []
		};
	}

	render() {
		return (
			<Row className="schedule-viewer-row">
				<Col md="4" >
					<SidePanel />
				</Col>
				<Col md="8" >
					<WorkArea />
				</Col>
			</Row>
		);
	}
}

export default EditSchedule;