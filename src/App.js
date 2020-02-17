import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import Bee from './components/bee.js';
import Hive from './components/hive.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);

class App extends React.Component {  	

	render () {
		
		return (

			<Router basename= {"/"}>

			  	<div>	
				  	
				  	<Bee />
				  	
				  	<Hive />

				</div>

			</Router>

		);
	}	

}


export default App;
