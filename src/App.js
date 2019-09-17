import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Bee from './components/bee.js';
import Hive from './components/hive.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faFacebookF, faInstagram, faTwitter)

class App extends React.Component {  	

	render () {
		
		return (

			<Router>

			  	<div>	
				  	
				  	<Bee />
				  	
				  	<Hive />

				</div>

			</Router>

		);
	}	

}


export default App;
