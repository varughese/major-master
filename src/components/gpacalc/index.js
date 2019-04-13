import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
import { Button, Input, InputGroup, Table, InputGroupAddon, FormGroup, Label } from 'reactstrap';
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
			if(self.points[course.grade] !== -1){
				totalPoints += self.points[course.grade] * creditsPerCourse;
				totalCredits += creditsPerCourse;
			}
		});
		const GPA = totalPoints / totalCredits;
		this.setState({
			totalPoints,
			totalCredits,
			GPA
		})

	}

	handleGradeSelect = (event, course) => {
		const key = course.key;
		const newGrade = event.target.value;
		
		const newCourses = this.state.courses.slice();
		newCourses.map(course => {
			if(course.key === key) {
				course.grade = newGrade;
			}
			return course;
		});
		this.calculateGPA(newCourses);
		this.setState({
			courses: newCourses
		});
  };

  async componentDidMount() {
		const snapshot = await this.props.firebase.user_ref().child("semesters").once('value');
		const semesters = snapshot.val();

		const course_list = Object.keys(semesters)
		.map(term => {
			const course_per_sem = semesters[term].courses || []
			return Object.keys(course_per_sem)
				.map(k => ({term: term, ...course_per_sem[k] }));
		})
		.filter(x => (x && x.length > 0))
		.sort((a, b) => a.termCode < b.termCode);

		for(let i=1; i<course_list.length; i++) {
			if(course_list[i].term !== course_list[i-1].term) {
				course_list[i].termDivider = true;
			}
		}

		const courses = [].concat.apply([], course_list).map(c => ({
			...c,
			key: c.id + "" + c.term
		}));


		this.calculateGPA(courses);

		this.setState({
			courses: courses
		});
	}
	
  render() {
		const courses = this.state.courses || [];
		const courseSelections = courses.map( (course, i) => {
			return(
				<tr key={course.key}>
					<td>{termNamer(course.term)}</td>
					<td>{course.id}</td>
					<td>
						<Input
							type="select"
							name="select"
							value={course.grade}
							id={course.id}
							onChange={e => {this.handleGradeSelect(e, course)}}
							>
							{Object.keys(this.points).map(grade => (
								<option key={grade}>{grade}</option>
							))}
						</Input>
					</td>
				</tr>
			)
		})
		
		const GPA = this.state.GPA;
		const semesterGPA = this.state.semesterGPA;
		const newGPA = this.state.newGPA;

		return (
			<div>	
				<h1>GPA: {GPA}</h1>
				<h3>Enter Expected Grades</h3>
				<Table>
					<thead>
						<tr>
							<th>Term</th>
							<th>Class</th>
							<th>Grade</th>
						</tr>
					</thead>
					<tbody>
						{courseSelections}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default withFirebase(GpaCalcBase);