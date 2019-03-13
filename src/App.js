import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { Container, Row } from 'reactstrap';

import { BootstrapExample } from './components';


class App extends Component {
  render() {
    return (
      <Router>
        <Container>
            <Row>
              <Link to="/">Home</Link>
              <Link to="/testbootstrap">Test boostrap</Link>
            </Row>
            <Switch>
              <Route path={ROUTES.HOME}></Route>
              <Route path={ROUTES.SIGN_UP}></Route>
              <Route path={ROUTES.SIGN_IN}></Route>
              <Route path={ROUTES.VIEW_SCHEDULE}></Route>
              <Route path={ROUTES.EDIT_SCHEDULE}></Route>
              <Route path={ROUTES.ENTER_CLASSES}></Route>
              <Route path={ROUTES.EDIT_INFO}></Route>
              <Route path={ROUTES.GPA_CALC}></Route>
              <Route path="/testbootstrap" component={BootstrapExample}></Route>
            </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
