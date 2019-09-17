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
					
						<NavLink className="shirts-link" activeClassName="link-active" to="/honey-nola/merch/shirts">

							<p className="link-text">Shirts</p>

						</NavLink>

					</li>

					<li>
					
						<NavLink  className="mugs-link" activeClassName="link-active" to="/honey-nola/merch/mugs">

							<p className="link-text">Mugs</p>						

						</NavLink>

					</li>
				
				</ul>

				<Route path={'/merch/shirts'} component={ Shirts } />

				<Route path={'/merch/mugs'} component={ Mugs } />

			</div>

		)

	}

}
