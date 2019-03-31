import React, { Component } from 'react';
// import { Row, Col } from 'reactstrap';
import SemesterViewer from './semester-viewer';
import ControlBar from './control-bar';
import { withFirebase } from '../firebase';

class WorkAreaBase extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			schedule: []
		};
	}

	componentDidMount() {
		this.setState({
			loading: true
		})
		this.props.firebase.user_ref().on('value', snapshot => {
			const userData = snapshot.val();
			this.transformUserData(userData);
			this.setState({
				loading: false
			});
		})
	}

	transformUserData(data) {
		const semesters = Object.keys(data.semesters).map(k => data.semesters[k]).sort(a => a.id);
		semesters.forEach(semester => {
			const courses = Object.keys(semester.courses).map(k => semester.courses[k]);
			semester.courses = courses;
			return courses;
		});
		console.log(semesters);
		this.setState({
			semesters: semesters
		})
	}

	componentWillUnmount() {
		this.props.firebase.user_ref().off();
	}

	render() {
		return (
			<>
				<SemesterViewer  semesters={this.state.semesters} />
				<ControlBar />
			</>
		);
	}
}

const WorkArea = withFirebase(WorkAreaBase);

export default WorkArea;