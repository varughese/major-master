import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

//eslint-disable-next-line
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

//eslint-disable-next-line
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

class Course extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditMode: props.isEditMode
		};
	}

	render() {
		const { id } = this.props;
		return (
			<div className="course-item">
				<div className="course-item-title">{id}</div>
				<div>
					<Button 
						color="danger" 
						size="sm" 
						onClick={() => this.props.removeCourse(id)}
					>
						X
					</Button>
				</div>
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

	addCourseToThisSemester = () => {
		console.log(this.props.termcode);
		this.props.addCourse(this.props.termcode, {
			id: "CS1" + Math.round(Math.random()*1000),
			grade: "A",
			status: "INPROG"
		});
	}

	removeCourseFromThisSemeseter = (id) => {
		this.props.removeCourse(this.props.termcode, { id });
	}

	render() {
		const { courses } = this.props;
		if (courses) {

		} else {
			console.log(courses);
		}
		return (
			<Col className="semester-card" md="2" sm="3">
				<div className="semester-title">{this.props.title}</div>
				<div className="semester-course-list">
					{courses.map(course => <Course key={course.id} {...course} removeCourse={this.removeCourseFromThisSemeseter} />)}
				</div>
				<Button onClick={this.addCourseToThisSemester}>Add Course</Button>
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
				<Semester key={sem.id} 
						  courses={sem.courses} 
						  termcode={sem.id}
						  title={sem.title} 
						  addCourse={this.props.addCourse}
						  removeCourse={this.props.removeCourse}
				/>
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