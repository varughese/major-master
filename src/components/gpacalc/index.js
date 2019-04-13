import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { withFirebase } from '../firebase';
import { GPA_CALC } from '../../constants/routes';
// import * as ROUTES from '../../constants/routes';

class GpaCalcBase extends Component {
  constructor(props) {
    super(props);

		this.state = { };

		this.totalPoints = 0;
		this.totalCredits = 0;

		this.speculatedGrades = {};

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

	
	
	calculateGPA(semesters){
		var self = this;
		var creditsPerCourse = 3;
		//iterate through semesters
		Object.entries(semesters).forEach(function(semester) {
			//iterate through grades
			Object.entries(semester[1].courses).forEach(function(course) {
				//add up grade points
				if(self.points[course[1].grade] !== -1){
					self.totalPoints += self.points[course[1].grade] * creditsPerCourse;
					self.totalCredits += creditsPerCourse;
				}

			});

		});

	}

	handleGradeSelect = (event, course) => {
		this.speculatedGrades[course] = event.target.value;

		var totalCredits = 0;
		var totalPoints = 0;

		for (const [course, grade] of Object.entries(this.speculatedGrades)) {
			totalCredits += 3;
			totalPoints += this.points[grade] * 3;
		}

		this.setState({
			semesterGPA: totalPoints/totalCredits,
			newGPA: (this.totalPoints + totalPoints)/(this.totalCredits + totalCredits)
		});
  };

  async componentDidMount() {
		const snapshot = await this.props.firebase.user_ref().child("semesters").once('value');
		const semesters = snapshot.val();

		const courses = semesters[2197].courses;

		this.calculateGPA(semesters);

		const courseSelections = Object.keys(courses).map( course => {
			return(
				<FormGroup>
					<Label for={course}>{course}</Label>

					<Input
						type="select"
						name="select"
						id={course}
						onChange={e => {this.handleGradeSelect(e, course);}}
						>
						{Object.keys(this.points).map(grade => (
							<option key={course+grade}>{grade}</option>
						))}
					</Input>

				</FormGroup>
	
			)
		})

		this.setState({
			courseSelections: courseSelections,
			courses: courses,
			semesters: semesters,
			GPA: this.totalPoints/this.totalCredits,
		})
	}
	
  render() {
	
	//const semesters = this.state.semesters;
	//<p>{ JSON.stringify(courses) }</p>
	//<p>{ JSON.stringify(semesters) }</p>
	//<Label for="asdf">Select</Label>
	//<Input type="text" name="asdf" id="exampleSelect" />
	//const courses = this.state.courses;
	const courseSelections = this.state.courseSelections;
	const GPA = this.state.GPA;
	var semesterGPA = this.state.semesterGPA;
	var newGPA = this.state.newGPA;

	if(semesterGPA != null ){
		semesterGPA = semesterGPA.toFixed(3);
	}

	if(newGPA != null ){
		newGPA = newGPA.toFixed(3);
	}

console.log(newGPA == null);
console.log(semesterGPA== null);

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