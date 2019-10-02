import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Shirts from './shirts.js';
import Mugs from './mugs.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

				<nav className="sideNav">

					<ul>

						<li>

							<a href={"/about"} target={"_blank"} className="sideLink">
								<FontAwesomeIcon icon={["fas", "info"]} size="xs" />
							</a> 

						</li>

						<li>

							<a href={"/merch/shirts"} target={"_blank"} className="sideLink">
								<FontAwesomeIcon icon={["fas", "tshirt"]} size="xs" />
							</a> 

						</li>

						<li>

							<a href={"/merch/mugs"} target={"_blank"} className="sideLink">
								<FontAwesomeIcon icon={["fas", "coffee"]} size="xs" />
							</a> 

						</li>

						<li>

							<a href={"/contact"} target={"_blank"} className="sideLink">
								<FontAwesomeIcon icon={["fas", "at"]} size="xs" />
							</a> 

						</li>

					</ul>

				</nav>
				
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
