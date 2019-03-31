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
			console.log(userData);
			this.setState({
				loading: false
			});
		})
	}

	componentWillUnmount() {
		this.props.firebase.user_ref().off();
	}

	render() {
		return (
			<>
				<SemesterViewer />
				<ControlBar />
			</>
		);
	}
}

const WorkArea = withFirebase(WorkAreaBase);

export default WorkArea;