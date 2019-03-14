import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class EditSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			schedule: []
		};
	}

	render() {
		return (
			<Row>
				<Col>
					<h1>Edit Schedule page</h1>
					<p>Edit sched</p>
				</Col>
			</Row>
		);
	}
}

export default EditSchedule;