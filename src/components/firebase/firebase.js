import app from "firebase/app";
import "firebase/database";
import "firebase/auth";

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

    this.cached_course_descriptions = JSON.parse(localStorage.getItem("cached_course_descriptions")) || {};
  }

  getUser = () => {
    if (this.auth.currentUser) {
      return this.auth.currentUser;
    } else {
      console.warn("No user. Log in");
      return null;
    }
  };

  getUserId = () => {
    const fromLocalStorage = JSON.parse(localStorage.getItem("authUser"));
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid;
    } else if (fromLocalStorage) {
      return fromLocalStorage.uid;
    } else {
      return null;
    }
  };

  signOut = () => {
    localStorage.removeItem("authUser");
    return this.auth.signOut();
  };

  user_ref = () => {
    const id = this.getUserId();
    return this.db.ref(`users/${id}`);
  };

  courses = () => this.db.ref("course_list");

  course_descriptions = () => this.db.ref("courses");

  async doSignInWithEmailAndPassword(email, password) {
    await this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async createUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async getCourseDescription(id) {
    const cache = this.cached_course_descriptions;
    if(cache[id]) return cache[id];

    const ref = this.db.ref("course_descriptions");
    const snapshot =  await ref.child(id).once("value");
    const description = snapshot.val();
    cache[id] = description;
    localStorage.setItem("cached_course_descriptions", JSON.stringify(cache));
    return description;
  }
}

export default Firebase;
