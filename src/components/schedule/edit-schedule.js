import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import SidePanel from './side-panel';
import WorkArea from './work-area';

class EditSchedule extends Component {
	render() {
		return (
			<Row className="schedule-viewer-row">
				<Col md="3" >
					<SidePanel />
				</Col>
				<Col md="9" >
					<WorkArea />
				</Col>
			</Row>
		);
	}
}

export default EditSchedule;