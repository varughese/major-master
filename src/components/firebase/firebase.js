import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyAsBSW4ShonjhvhdxFuqRwQs9_1VaTR-64",
	authDomain: "major-master-20a62.firebaseapp.com",
	databaseURL: "https://major-master-20a62.firebaseio.com",
	projectId: "major-master-20a62",
	storageBucket: "major-master-20a62.appspot.com",
	messagingSenderId: "386923600691"
};

class Firebase {
	constructor() {
		app.initializeApp(config);

		this.db = app.database();
		this.auth = app.auth();
	}

	getUserId = () => {
		if (this.auth.currentUser) {
			return this.auth.currentUser.uid;
		} else {
			return null;
		}
	}

	user_ref = () => {
		const id = this.getUserId();
		return this.db.ref(`users/${id}`);
	}

	courses = () => this.db.ref('course_list');

	course_descriptions = () => this.db.ref('courses');

	doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
}

export default Firebase;
