import React, { Component } from 'react';
import WorkArea from './work-area';
import * as ROUTES from '../../constants/routes';
import firebase from "firebase/app";


class EditSchedule extends Component {
	
	checkSignedIn = () => {
		var user = firebase.auth().currentUser;
		if(user == null) {
			window.location.assign(ROUTES.SIGN_IN);
		}
	}
	render() {
		this.checkSignedIn();
		return (
			<WorkArea />
		);
	}
}

export default EditSchedule;