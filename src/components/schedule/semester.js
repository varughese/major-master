import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { DropTarget } from 'react-dnd'

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

	addCourseToThisSemester = (course) => {
		this.props.addCourse(this.props.termcode, course);
	}

	removeCourseFromThisSemester = (id) => {
		this.props.removeCourse(this.props.termcode, { id });
	}

	render() {
		const { courses } = this.props;
		if (courses) {

		} else {
			console.log(courses);
		}
		return this.props.connectDropTarget(
			<div className="semester-card col-md-2 col-sm-3">
				<div className="semester-title">{this.props.title}</div>
				<div className="semester-course-list">
					{courses.map(course => <Course key={course.id} {...course} removeCourse={this.removeCourseFromThisSemester} />)}
				</div>
			</div>
		);
	}
}

const semesterTarget = {
	drop(props, monitor) {
		const item = monitor.getItem();
		props.addCourse(props.termcode, {
			id: item.id,
			grade: "?",
			status: "?"
		});
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}
}

export default DropTarget("SEARCHITEM", semesterTarget, collect)(Semester);