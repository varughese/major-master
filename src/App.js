import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { Container } from 'reactstrap';

import {
  BootstrapExample,
  EditSchedule,
  ViewSchedule,
  Home,
  SignInPage
} from './components';
import Navigation from './components/navigation';
import SignUp from './components/signup';
import { withAuthentication } from './components/session'

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Navigation />
          <Container fluid>
              <Switch>
                <Route path={ROUTES.HOME} component={Home}></Route>
                <Route path={ROUTES.EDIT_INFO}></Route>
				        <Route path={ROUTES.SIGN_UP} component ={SignUp}></Route>
                <Route path={ROUTES.SIGN_IN} component ={SignInPage}></Route>
                <Route path={ROUTES.ENTER_CLASSES}></Route>
                <Route path={ROUTES.VIEW_SCHEDULE} component={ViewSchedule}></Route>
                <Route path={ROUTES.EDIT_SCHEDULE} component={EditSchedule}></Route>
                <Route path={ROUTES.GPA_CALC}></Route>
                <Route path="/testbootstrap" component={BootstrapExample}></Route>
              </Switch>
          </Container>
        </>
      </Router>
    );
  }
}

export default withAuthentication(App);
