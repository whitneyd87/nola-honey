import React, { Component } from 'react';

export default class Shirts extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			value: "./img/mens-getdathoney.png",
			clicks: 1
		};
	}

	handleChange(e) {	
		this.setState({
			value: e.target.value
		});
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

				<figure className="shirtsFigure">

					<img className="itemImage" src={ require(`${this.state.value}`)} alt="shirt thumbnail"/>
				
				</figure>

				<div className="order-data">

					<select className="selectionBox" onChange={(e)=> this.handleChange(e)}>

						<option className="option" value="./img/mens-getdathoney.png">Mens - Get Dat Honey</option>

						<option className="option" value="./img/womens-getdathoney.png">Womens - Get Dat Honey</option>
						
						<option className="option" value="./img/mens-goodhives.png">Mens - Good Hives, Sweet Vibes</option>
						
						<option className="option" value="./img/womens-goodhives.png">Womens - Good Hives, Sweet Vibes</option>

					</select>

					<div className="quantity-container">

						<select>

							<option>XSmall</option>

							<option>Small</option>

							<option>Medium</option>

							<option>Large</option>

							<option>XLarge</option>

						</select>

						<div className="quantity-shirts">

							<button className="quantityBtn" onClick={()=>this.decreaseItem()}> - </button>

							<p> {this.state.clicks} </p>

							<button className="quantityBtn" onClick={()=>this.incrementItem()}> + </button>

						</div>

					</div>

					<input id="addBtn" type="submit" value="add to pot" />

					<div className="accredit">Icon made by <a href="https://www.flaticon.com/authors/twitter" title="Twitter">Twitter</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>

				</div>
				
			</div>

		)

	}

}
