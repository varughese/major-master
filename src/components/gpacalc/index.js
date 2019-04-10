import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
import { FormGroup, Label, Input } from 'reactstrap';
import { withFirebase } from '../firebase';
// import * as ROUTES from '../../constants/routes';

class GpaCalcBase extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  async componentDidMount() {
	const snapshot = await this.props.firebase.user_ref().child("semesters").once('value');
	const semesters = snapshot.val();
	console.log(semesters);
	const courses = semesters[2197].courses;
	this.setState({
		courses: courses
	})
  }
 
  render() {
	const courses = this.state.courses;
    return (
		<FormGroup>
			<Label for="asdf">Select</Label>
			<Input type="text" name="asdf" id="exampleSelect" />
			<p>{ JSON.stringify(courses) }</p>
		</FormGroup>
    );
  }
}

export default withFirebase(GpaCalcBase);