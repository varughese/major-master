import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { withFirebase } from '../firebase';
import termNamer from "../../constants/term-names";
// import * as ROUTES from '../../constants/routes';

class GpaCalcBase extends Component {
  constructor(props) {
    super(props);

		this.state = { };

		this.points = {
			'A+' : 4,
			'A'  : 4,
			'A-' : 3.75,
			'B+' : 3.25,
			'B'	 : 3,
			'B-' : 2.75,
			'C+' : 2.25,
			'C'	 : 2,
			'C-' : 1.75,
			'D+' : 1.25,
			'D'	 : 1,
			'D-' : .75,
			'F'	 : 0,
			'?'	 : -1
		}

	}

	
	
	calculateGPA(courses){
		var self = this;
		var creditsPerCourse = 3;

		let totalPoints = 0;
		let totalCredits = 0;
		courses.forEach(function(course) {
			//iterate through grades
				//add up grade points
				if(self.points[course.grade] !== -1){
					totalPoints += self.points[course.grade] * creditsPerCourse;
					totalCredits += creditsPerCourse;
				}
		});
		this.setState({
			totalPoints,
			totalCredits
		})

	}

	handleGradeSelect = (event, course) => {
		// this.speculatedGrades[course] = event.target.value;

		// var totalCredits = 0;
		// var totalPoints = 0;

		// for (const [course, grade] of Object.entries(this.speculatedGrades)) {
		// 	totalCredits += 3;
		// 	totalPoints += this.points[grade] * 3;
		// }

		// this.setState({
		// 	semesterGPA: totalPoints/totalCredits,
		// 	newGPA: (this.totalPoints + totalPoints)/(this.totalCredits + totalCredits)
		// });
  };

  async componentDidMount() {
		const snapshot = await this.props.firebase.user_ref().child("semesters").once('value');
		const semesters = snapshot.val();

		const course_list = Object.keys(semesters).map(k => {
			const course_per_sem = semesters[k].courses || []
			return Object.keys(course_per_sem)
				.map(k => ({term: k, ...course_per_sem[k] }));
		}).filter(x => (x && x.length > 0)).sort((a, b) => a.termCode < b.termCode);

		const courses = [].concat.apply([], course_list);


		this.calculateGPA(courses);

		this.setState({
			courses: courses
		});
	}
	
  render() {
		const courses = this.state.courses || [];
		const courseSelections = courses.map( (course, i) => {
			return(
				<FormGroup key={course.id + i}>
					<Label for={course.id}>{course.id}</Label>

					<Input
						type="select"
						name="select"
						id={course.id}
						onChange={e => {this.handleGradeSelect(e, course)}}
						>
						{Object.keys(this.points).map(grade => (
							<option key={course+grade}>{grade}</option>
						))}
					</Input>

				</FormGroup>
	
			)
		})
		
		const GPA = this.state.GPA;
		const semesterGPA = this.state.semesterGPA;
		const newGPA = this.state.newGPA;

		return (
			<form>
				
				<h1>GPA: {GPA}</h1>
				<br></br>
				<h3>Enter Expected Grades</h3>
				<br></br>
				{courseSelections}
		
				<h4>Expected Semester GPA: {semesterGPA}</h4>
				<h3>Expected New GPA: {newGPA}</h3>

			</form>
		);
	}
}

export default withFirebase(GpaCalcBase);