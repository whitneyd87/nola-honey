import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

export default class Merch extends Component {
	
	constructor(props) {
		super(props);
		this.state = { 
			valueOne: "./img/honeyjar.png",
			valueTwo: "./img/mens-getdathoney.png",
			clicks: 1
		};
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

	handleHoney(e) {	
		this.setState({
			valueOne: e.target.value
		});
	}

	handleShirts(e) {	
		this.setState({
			valueTwo: e.target.value
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

			<section className= "content-wrapper" ref={this.scrollIntoFocus}>

				<div className="order-section" id="honey">
				
					<figure className="itemFigure">

						<img className="itemImage" src={ require(`${this.state.valueOne}`) } alt="jar of honey"/>
					
					</figure>

					<div id="honey" className="order-data">

						<select className="selectionBox" onChange={(e)=> this.handleHoney(e)}>

							<option className="option" value="./img/honeyjar.png">Honey - By the Jar</option>

							<option className="option" value="./img/honeycase.png">Honey - By the Case (9 jars)</option>

						</select>

						<div className="quantity">

							<button className="quantityBtn" onClick={()=>this.decreaseItem()}> - </button>

							<p> {this.state.clicks} </p>

							<button className="quantityBtn" onClick={()=>this.incrementItem()}> + </button>

						</div>

						<input id="addBtn" type="submit" value="add to pot" />

					</div>

				</div>

				<div id="shirt" className="order-section">

					<figure className="itemFigure">

						<img className="itemImage" src={ require(`${this.state.valueTwo}`)} alt="shirt thumbnail"/>
				
					</figure>

					<div className="order-data">

						<select className="selectionBox" onChange={(e)=> this.handleShirts(e)}>

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

					</div>

				</div>

				<div id="mug" className="order-section">

					<figure className="itemFigure">

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

					</div>

				</div>

				<div className="accredit">Icon made by <a href="https://www.flaticon.com/authors/twitter" title="Twitter">Twitter</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>

			</section>

		)

	}

}
