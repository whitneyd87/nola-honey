import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import Bee from './components/bee.js';
import Hive from './components/hive.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCoffee, faTshirt, faInfo, faAt, faTint, faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faFacebookF, faInstagram, faTwitter, fas, faCoffee, faTshirt, faAngleDown, faAt, faInfo, faTint);

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
