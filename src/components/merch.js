import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Merch extends Component {
	
	constructor(props) {
		super(props);
		this.state = { 
			valueOne: "./img/honeyjar.png",
			valueTwo: "./img/mens-getdathoney.png",
			clicks: 1,
			arrowFirst: true,
			arrowSecond: true
		};
		this.scrollIntoFocus = React.createRef();
		this.handleArrow = this.handleArrow.bind(this);
	}

	handleArrow() {
		var y = window.scrollY;

		if( y > 800 ) {
			this.setState({
				arrowFirst: false
			});
		}

		if( y > 1900 ) {
			this.setState({
				arrowSecond: false
			});
		} else {
			this.setState({
				arrowFirst: true,
				arrowSecond: true
			});
		}
	}

	componentDidMount() {
		if(this.scrollIntoFocus.current){
            this.scrollIntoFocus.current.scrollIntoView({ 
               behavior: "smooth", 
               block: "start"
            })
        }

        window.addEventListener('scroll', this.handleArrow);
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


	render () {

		const{arrowFirst} = this.state;
		const{arrowSecond} = this.state;

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

						<select className="selectionBox">

							<option className="option">Qty: 1</option>
							<option className="option">Qty: 2</option>
							<option className="option">Qty: 3</option>
							<option className="option">Qty: 4</option>
							<option className="option">Qty: 5</option>
							<option className="option">Qty: 6</option>
							<option className="option">Qty: 7</option>
							<option className="option">Qty: 8</option>
							<option className="option">Qty: 9</option>
							<option className="option">Qty: 10</option>
							<option className="option">Qty: 11</option>
							<option className="option">Qty: 12</option>
							<option className="option">Qty: 13</option>
							<option className="option">Qty: 14</option>
							<option className="option">Qty: 15</option>
							<option className="option">Qty: 16</option>
							<option className="option">Qty: 17</option>
							<option className="option">Qty: 18</option>
							<option className="option">Qty: 19</option>
							<option className="option">Qty: 20</option>

						</select>

						<input id="addBtn" type="submit" value="add to pot" />

					</div>

					<div className={`arrow-down ${arrowFirst ? "bounce" : "arrow-hide"}`}>

						<FontAwesomeIcon icon={["fas", "angle-down"]} size="lg" />
					
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

						<select className="selectionBox">

							<option>XSmall</option>
							<option>Small</option>
							<option>Medium</option>
							<option>Large</option>
							<option>XLarge</option>

						</select>

						<select className="selectionBox">

							<option className="option">Qty: 1</option>
							<option className="option">Qty: 2</option>
							<option className="option">Qty: 3</option>
							<option className="option">Qty: 4</option>
							<option className="option">Qty: 5</option>
							<option className="option">Qty: 6</option>
							<option className="option">Qty: 7</option>
							<option className="option">Qty: 8</option>
							<option className="option">Qty: 9</option>
							<option className="option">Qty: 10</option>
							<option className="option">Qty: 11</option>
							<option className="option">Qty: 12</option>
							<option className="option">Qty: 13</option>
							<option className="option">Qty: 14</option>
							<option className="option">Qty: 15</option>
							<option className="option">Qty: 16</option>
							<option className="option">Qty: 17</option>
							<option className="option">Qty: 18</option>
							<option className="option">Qty: 19</option>
							<option className="option">Qty: 20</option>

						</select>

						<input id="addBtn" type="submit" value="add to pot" />

					</div>

					<div className={`arrow-down ${arrowSecond ? "bounce" : "arrow-hide"}`}>

						<FontAwesomeIcon icon={["fas", "angle-down"]} size="lg" />
					
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

						<select className="selectionBox">

							<option className="option">Qty: 1</option>
							<option className="option">Qty: 2</option>
							<option className="option">Qty: 3</option>
							<option className="option">Qty: 4</option>
							<option className="option">Qty: 5</option>
							<option className="option">Qty: 6</option>
							<option className="option">Qty: 7</option>
							<option className="option">Qty: 8</option>
							<option className="option">Qty: 9</option>
							<option className="option">Qty: 10</option>
							<option className="option">Qty: 11</option>
							<option className="option">Qty: 12</option>
							<option className="option">Qty: 13</option>
							<option className="option">Qty: 14</option>
							<option className="option">Qty: 15</option>
							<option className="option">Qty: 16</option>
							<option className="option">Qty: 17</option>
							<option className="option">Qty: 18</option>
							<option className="option">Qty: 19</option>
							<option className="option">Qty: 20</option>

						</select>

						<input id="addBtn" type="submit" value="add to pot" />

					</div>

				</div>

				<div className="accredit">Icon made by <a href="https://www.flaticon.com/authors/twitter" title="Twitter">Twitter</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>

			</section>

		)

	}

}
