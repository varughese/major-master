import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bootstrap-majormaster.sass';
import './styles/styles.css';
import App from './App';

import Firebase, { FirebaseContext } from './components/firebase';

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<App />
	</FirebaseContext.Provider>
,  document.getElementById('root'));