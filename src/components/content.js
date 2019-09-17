import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import About from './about.js';
import Contact from './contact.js';
import Honey from './honey.js';
import Merch from './merch.js';

function Content({ location }) {

	return (

		<div>

			<TransitionGroup className= "transition-group">

				<CSSTransition

					key={location.key}
					timeout={{ enter: 1000, exit: 1000}}
					className="fade"
				>

					<section className="route-section">

						<Switch location= {location}>

							<Route exact path="/nola-honey/honey" component={Honey}/>
							<Route path="/nola-honey/merch" component={Merch}/>
							<Route exact path="/nola-honey/about" component={About}/>
							<Route exact path="/nola-honey/contact" component={Contact}/>

						</Switch>

					</section>

				</CSSTransition>

			</TransitionGroup>

		</div>
	);
}

export default withRouter(Content);