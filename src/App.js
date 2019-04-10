import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Container } from "reactstrap";

import {
  BootstrapExample,
  EditSchedule,
  ViewSchedule,
  SignInPage
} from "./components";
import Navigation from "./components/navigation";
import SignUp from "./components/signup";
import { withAuthentication } from "./components/session";

class App extends Component {
  render() {
    const isLoggedIn = this.props.firebase.getUserId();
    console.log(isLoggedIn);
    return (
      <Router>
        <>
          <Navigation />
          <Container fluid>
            <Switch>
              <Route exact path="/">
                <Redirect
                  from="/"
                  to={isLoggedIn ? ROUTES.VIEW_SCHEDULE : ROUTES.SIGN_IN}
                />
              </Route>
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route path={ROUTES.EDIT_INFO} />
              <Route path={ROUTES.ENTER_CLASSES} />
              <Route path={ROUTES.VIEW_SCHEDULE} component={ViewSchedule} />
              <Route path={ROUTES.EDIT_SCHEDULE} component={EditSchedule} />
              <Route path={ROUTES.GPA_CALC} />
              <Route path="/testbootstrap" component={BootstrapExample} />
            </Switch>
          </Container>
        </>
      </Router>
    );
  }
}

export default withAuthentication(App);
