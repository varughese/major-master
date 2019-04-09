import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  FormText
} from "reactstrap";

import firebase from "firebase/app";
import "firebase/auth";
import * as ROUTES from "../constants/routes";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.firstPasswordCheck = "";
    this.confirmPasswordCheck = "";
  }

  state = {
    email: "",
    password: "",
	firstname: "",
	lastname: "",
	enrollterm: "",
    majors: [],
    validation: {
      validEmail: ""
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.firstPasswordCheck === this.confirmPasswordCheck) {
      this.setState(
        {
          password: this.confirmPasswordCheck
        },
        () => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.state.email,
              this.state.password
            )
            .then(result => {
				var user = firebase.auth().currentUser;
				user.sendEmailVerification();
				var database = firebase.database();
				var userList = database.ref('users');
				var newUser = userList.push(user.uid);
				newUser.set({
					'email': this.state.email,
					'enrollment_term': this.state.enrollterm,
					'first_name': this.state.firstname,
					'last__name': this.state.lastname,
					'id': user.uid,
					'majors': '',
					'semesters': ''
				});
					
              window.location.assign(ROUTES.HOME);
            })
            .catch(function(error) {
              // Handle Errors here.
              //this.couldNotAuth = true;
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log("errormessage: " + error.message);
              //<Label>errorMessage</Label>;
            });
          //console.log(firebase.auth().currentUser);
        }
      );
    } else console.log("no matching passwords");
  }; //comment

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleChangeFirstPasswordCheck = event => {
    this.firstPasswordCheck = event.target.value;
  };

  handleChangeConfirmPasswordCheck = event => {
    this.confirmPasswordCheck = event.target.value;
  };

  checkEmail(e) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validation } = this.state;
    if (regex.test(e.target.value)) {
      validation.validEmail = "success";
    } else {
      validation.validEmail = "error";
    }
    this.setState({ validation });
  }

  render() {
    return (
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="inputFirstName">Name:</Label>
            <Input
              name="firstname"
              id="inputFirstName"
              placeholder="First name"
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <Input
              name="lastname"
              id="inputLastName"
              placeholder="Last name"
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </FormGroup>
		  <FormGroup>
			<Label for="inputEnrollTerm">Enrollment Term:</Label>
			<Input
				name="enrollterm"
				id="inputEnrollTerm"
				placeholder="Enrollment Term"
				onChange={e => {
					this.handleChange(e);
				}}
			/>
		  </FormGroup>
          <FormGroup>
            <Label for="inputEmail">Email address:</Label>
            <Input
              type="email"
              name="email"
              id="inputEmail"
              placeholder="e.g. johndoe123@email.com"
              onChange={e => {
                this.checkEmail(e);
                this.handleChange(e);
              }}
              //valid={this.state.validation.emailState === "success"}
              //invalid={this.state.validation.emailState === "error"}
            />
            {/*<FormFeedback valid>Valid email</FormFeedback>
          <FormFeedback invalid>Invalid email</FormFeedback>*/}
          </FormGroup>
          <FormGroup>
            <Label for="inputPassword1">Create Password:</Label>
            <Input
              type="password"
              name="password1"
              id="inputPassword1"
              placeholder="No spaces or special characters such as '!@#$%'"
              onChange={e => {
                this.handleChangeFirstPasswordCheck(e);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputPassword2">Confirm Password:</Label>
            <Input
              type="password"
              name="password"
              id="inputPassword2"
              placeholder="Confirm password"
              onChange={e => {
                this.handleChangeConfirmPasswordCheck(e);
              }}
            />
          </FormGroup>
          <Button type="submit">Create Account</Button>
        </form>
      </Col>
    );
  }
}