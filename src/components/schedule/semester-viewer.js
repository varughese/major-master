import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class SemesterEditMode extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				Semester 
				Edit me!
			</div>
		);
	}
}

class SemesterViewMode extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				Semester 
				view me
			</div>
		);
	}	
}

class Semester extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditMode: false
		};
	}

	render() {
		return this.state.isEditMode ? <SemesterEditMode />  : <SemesterViewMode />;
	}
}

class SemesterViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Row>
				<Col>
					<h1>Semester Viewer component</h1>
					<Semester />
				</Col>
			</Row>
		);
	}
}

export default SemesterViewer;