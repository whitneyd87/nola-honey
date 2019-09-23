import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Shirts from './shirts.js';
import Mugs from './mugs.js';


export default class Merch extends Component {
	
	constructor(props) {
		super(props);
		this.scrollIntoFocus = React.createRef();
	}

	componentDidMount() {
		if(this.scrollIntoFocus.current){
            this.scrollIntoFocus.current.scrollIntoView({ 
               behavior: "smooth", 
               block: "start"
            })
        }
	}

	render () {

		return (

			<div className= "content-wrapper" ref={this.scrollIntoFocus}>
				
				<ul className="merch-nav">

					<li>
					
						<NavLink className="shirts-link" activeClassName="link-active" to="/merch/shirts">

							<p className="link-text">Shirts</p>

						</NavLink>

					</li>

					<li>
					
						<NavLink  className="mugs-link" activeClassName="link-active" to="/merch/mugs">

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
