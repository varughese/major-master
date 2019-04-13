import React, { Component } from 'react';
import { Input, Table } from 'reactstrap';
import { withFirebase } from '../firebase';
import termNamer from "../../constants/term-names";

class GpaCalcBase extends Component {
  constructor(props) {
    super(props);

		this.state = { 
			GPA: "??"
		};

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

	handleCourseStatus = (event, course) => {
		const key = course.key;
		const newStatus = event.target.value;
		const term = course.term;

		const newCourses = this.state.courses.slice();
		newCourses.map(course => {
			if(course.key === key) {
				course.status = newStatus;
			}
			return course;
		});

		const course_ref = this.props.firebase.user_ref().child("semesters").child(term).child("courses").child(course.id);
		course_ref.update({status: newStatus});
		this.setState({
			courses: newCourses
		});
	}

	handleGradeSelect = (event, course) => {
		const key = course.key;
		const newGrade = event.target.value;
		const term = course.term;
		
		const course_ref = this.props.firebase.user_ref().child("semesters").child(term).child("courses").child(course.id);
		course_ref.update({grade: newGrade});

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

		const courses = [].concat.apply([], course_list).map(c => ({
			...c,
			key: c.id + "" + c.term
		}));

		for(let i=1; i<courses.length; i++) {
			if(courses[i].term !== courses[i-1].term) {
				courses[i].termDivider = true;
			}
		}

		this.calculateGPA(courses);

		this.setState({
			courses: courses
		});
	}
	
  render() {
		const courses = this.state.courses || [];
		let courseSelections = courses.map( (course, i) => {
			let className = "";
			if(course.termDivider) className = "term-divider";
			return(
				<tr key={course.key} className={className}>
					<td>{termNamer(course.term)}</td>
					<td>{course.id}</td>
					<td>
						<Input
							type="select"
							name="status"
							value={course.status}
							onChange={e => {this.handleCourseStatus(e, course)}}
							>
							<option value="COMPLETED">Completed this class</option>
							<option value="INPROG">In Progress</option>
							<option value="FUTURE">Future</option>
						</Input>
					</td>
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
		
		if(courses.length === 0) {
			courseSelections = (<tr>
				<td>...</td>
				<td> Loading </td>
				<td>...</td>
			</tr>)
		}

		const GPA = isNaN(this.state.GPA) ? "??" : this.state.GPA.toFixed(2);

		return (
			<div className="gpa-calculator">	
				<h1>GPA: {GPA}</h1>
				<h3>Enter Expected Grades</h3>
				<Table>
					<thead>
						<tr>
							<th>Term</th>
							<th>Class</th>
							<th>Status</th>
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