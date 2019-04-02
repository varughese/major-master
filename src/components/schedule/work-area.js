import React, { Component } from 'react';
// import { Row, Col } from 'reactstrap';
import SemesterViewer from './semester-viewer';
import ControlBar from './control-bar';
import { withFirebase } from '../firebase';
import termNamer from "../../constants/term-names";
import SidePanel from "./side-panel";
import { Col, Row } from "reactstrap";

class WorkAreaBase extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			semestersList: [],
			courses: []
		};
	}

	async componentDidMount() {
		this.setState({
			loading: true
		})

		this.props.firebase.user_ref().on('value', snapshot => {
			const userData = snapshot.val();
			const { semestersHash, semestersList } = this.transformSemesterHashToList(userData.semesters);
			console.log("Data recieved from database", semestersHash);
			this.setState({
				loading: false,
				semestersHash,
				semestersList
			});
		});

		// TOOO store this in local storage
		const snapshot = await this.props.firebase.courses().once('value');
		this.setState({
			courses: snapshot.val()
		})
	}

	transformSemesterHashToList(data={}) {
		const semesters = Object.keys(data).map(k => data[k]).sort(a => a.id);
		const semestersList = semesters.map(semester => {
			const courses = Object.keys(semester.courses || []).map(k => semester.courses[k]);
			const transformedSemester = { ...semester};
			transformedSemester.courses = courses || [];
			transformedSemester.title = termNamer(semester.id);
			return transformedSemester;
		});
		return {
			semestersHash: data,
			semestersList: semestersList
		};
	}

	componentWillUnmount() {
		this.props.firebase.user_ref().off();
	}

	addSemester(termcode, courses={}) {
		const data = {};
		data[termcode] = { courses: courses, id: termcode };
		this.props.firebase.user_ref().child("semesters").update(data);
	}

	addCourse(termcode, course) {
		if(!course.id) {
			console.error("Course cannot be added without an id");
			return;
		}
		termcode = Number(termcode);
		this.setState(prevState => {
			const semesters = Object.assign({}, prevState.semestersHash); 
			if(!semesters[termcode]) {
				console.error("Semester", termcode, "not found in data");
				return;
			}
			if(!semesters[termcode].courses) semesters[termcode].courses = {};
			semesters[termcode].courses[course.id] = course;
			const { semesterHash, semestersList } = this.transformSemesterHashToList(semesters);
			return {
				semesterHash, 
				semestersList
			};
		});
		this.props.firebase.user_ref().child(`semesters/${termcode}/courses/${course.id}`).update(course);
	}

	removeCourse(termcode, course) {
		if(!course.id) {
			console.error("Course cannot be removed without an id");
			return;
		}
		termcode = Number(termcode);
		this.setState(prevState => {
			const semesters = Object.assign({}, prevState.semestersHash); 
			if(!semesters[termcode]) {
				console.error("Semester", termcode, "not found in data");
				return;
			}
			delete semesters[termcode].courses[course.id]
			const { semesterHash, semestersList } = this.transformSemesterHashToList(semesters);
			return {
				semesterHash, 
				semestersList
			};
		});
		this.props.firebase.user_ref().child(`semesters/${termcode}/courses/${course.id}`).remove();
	}

	render() {
		return (
			<Row className="schedule-viewer-row">
				<Col md="3" className="side-panel-holder">
					<SidePanel courses={this.state.courses} />
				</Col>
				<Col md="9">
					<SemesterViewer  
						semesters={this.state.semestersList} 
						addCourse={this.addCourse.bind(this)} 
						removeCourse={this.removeCourse.bind(this)}
					/>
					<ControlBar addSemester={this.addSemester.bind(this)} />
				</Col>
			</Row>
		);
	}
}

const WorkArea = withFirebase(WorkAreaBase);

export default WorkArea;