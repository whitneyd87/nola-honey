import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Mugs extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: "Tea Mug - Tea. Bee.",
			clicks: 1
		};
	}

	incrementItem() {	
		if (this.state.clicks < 30) {
			this.setState({
				clicks: this.state.clicks + 1
			});
		}
	}

	decreaseItem() {
		if (this.state.clicks > 1) {
			this.setState({
				clicks: this.state.clicks - 1
			});
		}
	}
	

	render () {

		return (

			<div className="content-nested">

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

				<figure className="itemFigure mugFigure">

					<img className="itemImage" src={ require ('./img/tea.png') } alt="men's get dat honey shirt"/>
				
				</figure>

				<div className="order-data">

					<select className="selectionBox">

						<option className="option" value="Tea Mug - Tea. Bee.">Tea Mug - Tea. Bee.</option>

					</select>

					<div className="quantity">

						<button className="quantityBtn" onClick={()=>this.decreaseItem()}> - </button>

						<p> {this.state.clicks} </p>

						<button className="quantityBtn" onClick={()=>this.incrementItem()}> + </button>

					</div>

					<input id="addBtn" type="submit" value="add to pot" />

					<div className="accredit">Icon made by <a href="https://www.flaticon.com/authors/twitter" title="Twitter">Twitter</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>

				</div>
			</div>

		)

	}

}
