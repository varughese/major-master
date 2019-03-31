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
			<div className="semester-card">
				<ul>
					{courses.map(course => <li key={course.id}>{course.id}</li>)}
				</ul>
			</div>
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
			semestersElements = semesters.map((sem) => (<Semester key={sem.id} courses={sem.courses} term={sem.id} />))
		}
		return (
			<Row>
				<Col>
					<h1>Semester Viewer component</h1>
					{semestersElements}
				</Col>
			</Row>
		);
	}
}

export default SemesterViewer;