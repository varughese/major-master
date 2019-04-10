import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { withFirebase } from "./firebase";
import { compose } from "recompose";

import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarBrand
} from "reactstrap";

class NavigationBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState((state, props) => ({
      isOpen: !state.isOpen
    }));
  };

  closeCollapsed = () => {
    this.setState({
      isOpen: false
    });
  };

  signOut = async () => {
    await this.props.firebase.signOut();
    this.props.history.push(ROUTES.LANDING);
  };

  render() {
    const user = this.props.firebase.getUserId();
    return (
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Major Master</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto bg-primary" navbar>
            <NavItem onClick={this.closeCollapsed}>
              <Link className="nav-link" to={ROUTES.HOME}>
                Home
              </Link>
            </NavItem>
            {user == null && (
              <>
                <NavItem onClick={this.closeCollapsed}>
                  <Link className="nav-link" to={ROUTES.SIGN_UP}>
                    Sign Up
                  </Link>
                </NavItem>
                <NavItem onClick={this.closeCollapsed}>
                  <Link className="nav-link" to={ROUTES.SIGN_IN}>
                    Sign In
                  </Link>
                </NavItem>
              </>
            )}
            {user != null && (
              <>
                <NavItem onClick={this.closeCollapsed}>
                  <Link className="nav-link" to={ROUTES.EDIT_SCHEDULE}>
                    Edit Schedule
                  </Link>
                </NavItem>
                <NavItem onClick={this.closeCollapsed}>
                  <Link className="nav-link" to={ROUTES.VIEW_SCHEDULE}>
                    View Schedule
                  </Link>
                </NavItem>
              </>
            )}
            <NavItem onClick={this.closeCollapsed}>
              <Link className="nav-link" to="/testbootstrap">
                Test Bootstrap
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                My Account
              </DropdownToggle>
              <DropdownMenu right>
                {user != null && (
                  <>
                    <DropdownItem onClick={this.signOut}>Sign Out</DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const NavigationPage = compose(
  withRouter,
  withFirebase
)(NavigationBase);

export default NavigationPage;
