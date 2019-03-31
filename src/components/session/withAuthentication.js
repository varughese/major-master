import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';


const withAuthentication = Component => {
	class WithAuthentication extends React.Component {
		constructor(props) {
			super(props);
		
			this.state = {
			  authUser: null
			}
		  }
		
		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
				if(authUser) {
					localStorage.setItem('authUser', JSON.stringify(authUser));
					this.setState({ authUser });
				} else {
					localStorage.removeItem('authUser');
					this.setState({ authUser: null });
				}
			})
		}
	
		componentWillUnmount() {
			this.listener();
		}

		render() {
			return (
				<AuthUserContext.Provider value={this.state.authUser}>
					<Component {...this.props} />
				</AuthUserContext.Provider>
			);
		}
	}

	return withFirebase(WithAuthentication);
}

export default withAuthentication;