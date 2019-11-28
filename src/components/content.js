import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import About from './about.js';
import Contact from './contact.js';
import Merch from './merch.js';

function Content({ location }) {

	return (

		<div>

			<TransitionGroup>

				<CSSTransition

					key={location.key}
					timeout={{ enter: 1000, exit: 500}}
					classNames="fade"
				>

					<section>

						<Switch location= {location}>

							<Route exact path={"/merch"} component={Merch}/>
							<Route exact path={"/about"} component={About}/>
							<Route exact path={"/contact"} component={Contact}/>

						</Switch>

					</section>

				</CSSTransition>

			</TransitionGroup>

		</div>
	);
}

export default withRouter(Content);