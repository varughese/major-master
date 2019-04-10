import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import { Col, Row, Button, FormGroup, Input } from "reactstrap";

// import { SignUpLink } from '../SignUp';
import { withFirebase } from "../firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <FormGroup>
    <SignInForm />
  </FormGroup>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    event.preventDefault();

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <h2>Sign in</h2>
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <Row>
            <Col sm="3">
              <Button disabled={isInvalid} type="submit">
                Sign In
              </Button>
            </Col>
            <Col sm="9">
              <p className="text-right">
                Don't have an account? Sign up{" "}
                <Link to={ROUTES.SIGN_UP}>here.</Link>
              </p>
            </Col>
          </Row>

          {error && <p>{error.message}</p>}
        </form>
      </Col>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
