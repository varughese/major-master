import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bootstrap-majormaster.sass';
import './styles/styles.css';
import App from './App';

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'	
import Firebase, { FirebaseContext } from './components/firebase';

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<DragDropContextProvider backend={HTML5Backend}>
			<App />
		</DragDropContextProvider>
	</FirebaseContext.Provider>
,  document.getElementById('root'));
	