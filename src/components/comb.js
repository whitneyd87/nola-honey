import React, { Component } from 'react';


export default class Comb extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isClicked: false
		};
	}

	handleClick () {
		this.setState({
			isClicked: !this.state.isClicked
		});
	}

	render () {

		const{isClicked} = this.state;
		
		return (
			
			<section className="comb-container" onClick={()=> this.handleClick()} >

				<svg id='comb' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'>
				    
				    <polygon points='555,155.432 555.037,446.808 302.037,591.346 49,444.507 48.963,153.131 301.963,8.593'
				    />
				
				    <radialGradient id='honey-fill' cx='302' cy='299.969' r='272.881' gradientUnits='userSpaceOnUse'>
				
				        <stop offset='0' stopColor='#fed086' />
				
				        <stop offset='0.964' stopColor='#fbb03b' />
				
				    </radialGradient>
				
				    <polygon  className={`honey ${ isClicked ? "comb-fill" : " "}`} points='555,155.432 555.037,446.808 302.037,591.346 49,444.507 48.963,153.131 301.963,8.593'
				    />

				</svg>
				
			</section>
		)
	}
}