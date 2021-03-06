import React, { Component } from 'react';
import { Row } from 'reactstrap';
import Semester from './semester';

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
						  checkPrereq={this.props.checkPrereq}
						  removeCourse={this.props.removeCourse}
						  setCurrentCourse={this.props.setCurrentCourse}
						  viewMode={this.props.viewMode}
				/>
			))
		}
		return (
			<Row className="semesters-holder">
				{semestersElements}
			</Row>
		);
	}
}

export default SemesterViewer;