import React, { Component } from 'react';

export default class Honey extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			value: "./img/honeyjar.png",
			clicks: 1
		};
		this.scrollIntoFocus = React.createRef();
	}

	handleChange(e) {	
		this.setState({
			value: e.target.value
		});
	}

	incrementItem() {
		if (this.state.clicks < 8) {
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

				<figure className="itemFigure">

					<img className="itemImage" src={ require(`${this.state.value}`) } alt="jar of honey"/>
				
				</figure>

				<div className="order-data">

					<select className="selectionBox" onChange={(e)=> this.handleChange(e)}>

						<option className="option" value="./img/honeyjar.png">Honey - By the Jar</option>

						<option className="option" value="./img/honeycase.png">Honey - By the Case (9 jars)</option>

					</select>

					<div className="quantity">

						<button className="quantityBtn" onClick={()=>this.decreaseItem()}> - </button>

						<h2> {this.state.clicks} </h2>

						<button className="quantityBtn" onClick={()=>this.incrementItem()}> + </button>

					</div>

					<input id="addBtn" type="submit" value="add to pot" />

					<div className="accredit">Icon made by <a href="https://www.flaticon.com/authors/twitter" title="Twitter">Twitter</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>

				</div>
				
			</div>

		)

	}

}
