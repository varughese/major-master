import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import firebase from "firebase/app";
import "firebase/auth";
import { Navbar, NavbarToggler, Collapse, Nav,
	NavItem, UncontrolledDropdown, DropdownToggle,
	DropdownMenu, DropdownItem, NavbarBrand } from 'reactstrap';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	toggle = () => {
		this.setState((state, props) => ({
			isOpen: !state.isOpen
		}))
	}

	closeCollapsed = () => {
		this.setState({
			isOpen: false
		})
	}
	
	signOut = () => {
		firebase.auth().signOut();
	}

	render() {
		const user = firebase.auth().currentUser;
		console.log(user);
		return (
			<Navbar color="primary" dark expand="md">
				<NavbarBrand href="/">Major Master</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto bg-primary" navbar>
						<NavItem onClick={this.closeCollapsed}>
							<Link className="nav-link" to={ROUTES.HOME}>Home</Link>
						</NavItem>
						{user == null && (<>
							<NavItem onClick={this.closeCollapsed}>
								<Link className="nav-link" to={ROUTES.SIGN_UP}>Sign Up</Link>
							</NavItem>
							<NavItem onClick={this.closeCollapsed}>
								<Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
							</NavItem>
						</>)}
						{user != null && (<>
						<NavItem onClick={this.closeCollapsed}>
							<Link className="nav-link" to={ROUTES.EDIT_SCHEDULE}>Edit Schedule</Link>
						</NavItem>
						<NavItem onClick={this.closeCollapsed}>
							<Link className="nav-link" to={ROUTES.VIEW_SCHEDULE}>View Schedule</Link>
						</NavItem>
						</>)}
						<NavItem onClick={this.closeCollapsed}>
							<Link className="nav-link" to="/testbootstrap">Test Bootstrap</Link>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>My Account</DropdownToggle>
							<DropdownMenu right>
								{user != null && (<>
								<DropdownItem onClick ={this.signOut}>Sign Out</DropdownItem>
								</>)}
								<DropdownItem>Option 2</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Reset</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

export default Navigation;