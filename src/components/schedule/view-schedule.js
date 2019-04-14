import React, { Component } from 'react';
import SemesterViewer from './semester-viewer';
import termNamer from "../../constants/term-names";
import { withFirebase } from '../firebase';
// import { Row, Col } from 'reactstrap';

class ViewScheduleBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			schedule: []
		};
	}

	async componentWillMount() {
		this.setState({
			loading: true
		})
		
		this.props.firebase.user_ref().on('value', snapshot => {
			const userData = snapshot.val();
			const { semestersHash, semestersList } = this.transformSemesterHashToList(userData.semesters);
			this.setState({
				loading: false,
				userData,
				semestersHash,
				semestersList
			});
		});
	}

	// should not be here cuz this is copied but deadline was soon
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

	render() {
		return (
			<SemesterViewer semesters={this.state.semestersList} viewMode={true}/>
		);
	}
}

export default withFirebase(ViewScheduleBase);