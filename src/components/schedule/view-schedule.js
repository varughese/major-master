import React, { Component } from 'react';
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
			<Row>
				<Col>
					<h1>View Schedule page</h1>
					<p>View sched</p>
				</Col>
			</Row>
		);
	}
}

export default ViewSchedule;