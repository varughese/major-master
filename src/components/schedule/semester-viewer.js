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
		const { courses } = this.props;
		if (courses) {

		} else {
			console.log(courses);
		}
		return (
			<Col className="semester-card" md="auto">
				<div className="semester-title">{this.props.title}</div>
				<ul>
					{courses.map(course => <li key={course.id}>{course.id}</li>)}
				</ul>
			</Col>
		);
	}
}

class SemesterViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { semesters } = this.props;
		let semestersElements = <div>Loading</div>
		if(semesters) {
			semestersElements = semesters.map((sem) => (
				<Semester key={sem.id} courses={sem.courses} title={sem.title} />
			))
		}
		return (
			<Row>
				<Col>
					<h4>Semester Viewer component</h4>
					<Row className="semesters-holder">
						{semestersElements}
					</Row>
				</Col>
			</Row>
		);
	}
}

export default SemesterViewer;