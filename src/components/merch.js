import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Shirts from './shirts.js';
import Mugs from './mugs.js';


export default class Merch extends Component {
	
	render () {

		return (

			<div className= "content-wrapper">
				
				<ul className="merch-nav">

					<li>
					
						<NavLink className="shirts-link" activeClassName="link-active" to="/nola-honey/merch/shirts">

							<p className="link-text">Shirts</p>

						</NavLink>

					</li>

					<li>
					
						<NavLink  className="mugs-link" activeClassName="link-active" to="/nola-honey/merch/mugs">

							<p className="link-text">Mugs</p>						

						</NavLink>

					</li>
				
				</ul>

				<Route path={'/nola-honey/merch/shirts'} component={ Shirts } />

				<Route path={'/nola-honey/merch/mugs'} component={ Mugs } />

			</div>

		)

	}

}
