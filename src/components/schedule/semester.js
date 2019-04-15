import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { DropTarget, DragSource } from 'react-dnd'

class CourseBase extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditMode: props.isEditMode
		};
	}

	render() {
		const { id } = this.props;
		
		return this.props.connectDragSource(
			<div className="course-item" onClick={this.props.setCurrentCourse}>
				<div className="course-item-title">{id}</div>
				<div>
					{!this.props.viewMode &&
					<Button 
						color="danger" 
						size="sm" 
						onClick={(e) => {
							e.stopPropogation();
							this.props.removeCourse(id)
						}}
					>
						X
					</Button>
					}
				</div>
			</div>
		);
	}
}

function courseCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()		
	}
}

const Course = DragSource("COURSE", {
	beginDrag(props) {
		return {removeMe: true, ...props};
	}
}, courseCollect)(CourseBase);

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
		return this.props.connectDropTarget(
			<div className="semester-card col-md-2 col-sm-3">
				<div className="semester-title">{this.props.title}</div>
				<div className="semester-course-list">
					{courses.map(course => (
						<Course key={course.id}
								termcode={this.props.termcode}
								{...course}
								removeCourse={this.removeCourseFromThisSemester}
								viewMode={this.props.viewMode}
								setCurrentCourse={() => this.props.setCurrentCourse(course.id)}
						/>))}
				</div>
			</div>
		);
	}
}

const semesterTarget = {
	drop(props, monitor) {
		const item = monitor.getItem();
		if(item.removeMe) {
			props.removeCourse(item.termcode, {
				id: item.id
			});
		}
		props.checkPrereq(props.termcode, item.id);
		props.addCourse(props.termcode, {
			id: item.id,
			grade: "?",
			status: "FUTURE"
		});
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}
}

export default DropTarget("COURSE", semesterTarget, collect)(Semester);