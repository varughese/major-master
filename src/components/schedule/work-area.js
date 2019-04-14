import React, { Component } from 'react';
// import { Row, Col } from 'reactstrap';
import SemesterViewer from './semester-viewer';
import ControlBar from './control-bar';
import { withFirebase } from '../firebase';
import termNamer from "../../constants/term-names";
import SidePanel from "./side-panel";
import { Col, Row } from "reactstrap";
import * as jsPDF from 'jspdf'


class WorkAreaBase extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			semestersList: [],
			course_list: []
		};

		this.setCurrentCourseDescription = this.setCurrentCourseDescription.bind(this);
	}

	async componentWillMount() {
		this.setState({
			loading: true
		})
		
		this.props.firebase.user_ref().on('value', snapshot => {
			const userData = snapshot.val();
			const { semestersHash, semestersList } = this.transformSemesterHashToList(userData.semesters);
			console.log("Data recieved from database", semestersHash);
			this.setState({
				loading: false,
				userData,
				semestersHash,
				semestersList
			});
		});

		this.fetchCourseListFromFirebase();
	}

	async setCurrentCourseDescription(id) {
		const description = await this.props.firebase.getCourseDescription(id);
		if(description) {
			this.setState({
				currentDescription: description
			});
		}
	}

	async fetchCourseListFromFirebase() {
		// TOOO store this in local storage
		let coursesList = JSON.parse(localStorage.getItem("course_list"));
		if (!coursesList) {
			const snapshot = await this.props.firebase.courses().once('value');
			coursesList = this.transformCourseListData(snapshot.val());
			localStorage.setItem('course_list', JSON.stringify(coursesList));
		}
		this.setState({
			course_list: coursesList
		})
	}

	transformCourseListData(data) {
		const d = Object.keys(data).map(k => data[k]);
		return [].concat.apply([], d);
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

	exportPDF(){
		const firstName = this.state.userData.first_name;
		const lastName = this.state.userData.last_name;
		const data = this.state.semestersHash;

		const doc = new jsPDF();
		doc.text(firstName + " " + lastName + "'s Plan", 20, 20);
		doc.line(20,30,200,30);

		let y_value = 40
		for (const key in data){
			doc.text(termNamer(data[key].id),20,y_value);
			let courseNumber = 1;
			for(const key2 in data[key].courses){
				if((y_value+courseNumber*10) >= 280){
					doc.addPage();
					y_value = 20;
					courseNumber = 1;
				}
				doc.text(" - " + data[key].courses[key2].id, 30, y_value + courseNumber*10)
				courseNumber++;
			}
			y_value = y_value + courseNumber*10;
		}
		doc.save('Schedule.pdf');
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
					<SidePanel
						course_list={this.state.course_list}
						currentCourse={this.state.currentDescription}
					/>
				</Col>
				<Col md="9">
					<SemesterViewer  
						semesters={this.state.semestersList} 
						addCourse={this.addCourse.bind(this)} 
						removeCourse={this.removeCourse.bind(this)}
						setCurrentCourse={this.setCurrentCourseDescription.bind(this)}
					/>
					<ControlBar 
						addSemester={this.addSemester.bind(this)}
						exportPDF={this.exportPDF.bind(this)}
						setCurrentCourse={this.setCurrentCourseDescription.bind(this)}
					 />
				</Col>
			</Row>
		);
	}
}

const WorkArea = withFirebase(WorkAreaBase);

export default WorkArea;