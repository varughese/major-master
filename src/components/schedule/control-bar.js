import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

class ControlBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="control-bar">
				<Button color="primary">Add Semester</Button>
				<Button color="primary">Edit my info</Button>
			</div>
		);
	}
}

export default ControlBar;