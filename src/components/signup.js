import React from "react";
import {
  Col,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { withFirebase } from './firebase';
import * as ROUTES from "../constants/routes";

class SignUpBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password: "",
      firstname: "",
      lastname: "",
      enrollterm: "",
      majors: [],
      validation: {
        validEmail: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.password === this.state.password1) {
      try {
        await this.props.firebase.createUserWithEmailAndPassword(this.state.email, this.state.password)
      } catch (e) {
        this.setState({
          errorMessage: e.message
        });
        return;
      }
      
      const user = this.props.firebase.getUser();
      user.sendEmailVerification();
      const user_ref = this.props.firebase.user_ref();
      user_ref.set({
        'email': this.state.email,
        'enrollment_term': this.state.enrollterm,
        'first_name': this.state.firstname,
        'last__name': this.state.lastname,
        'id': user.uid,
        'majors': '',
        'semesters': {
          [this.state.enrollterm]: {
            id: this.state.enrollterm,
            courses: {}
          }
        }
      });

      // this is janky lol, suppose to do similar to what
      // kyle did with React Router
      window.location.assign(ROUTES.HOME);
    } else {
      this.setState({
        errorMessage: "Passwords do not match"
      })
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      errorMessage: ""
    });
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
    const { errorMessage } = this.state;
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
                this.handleChange(e);
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
                this.handleChange(e);
              }}
            />
          </FormGroup>
          <p>{errorMessage}</p>
          <Button type="submit">Create Account</Button>
        </form>
      </Col>
    );
  }
}

export default withFirebase(SignUpBase)