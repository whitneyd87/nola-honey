import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Aboutcomb extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isAbout: false
		};

	}

	componentWillMount() {
		localStorage.getItem('isAbout') && this.setState({
			isAbout: JSON.parse(localStorage.getItem('isAbout'))
		});
	}

	fillComb () {
		this.setState({
			isAbout: true
		});
		localStorage.setItem('isAbout', true);
	}

	emptyComb () {
		this.setState({
			isAbout: false
		});
		localStorage.setItem('isAbout', false);
	}


	render () {

		const{isAbout} = this.state;	
			
		return (
			
			<div className="comb-container" >

				<svg id='comb' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'>
				    <polygon points='555,155.432 555.037,446.808 302.037,591.346 49,444.507 48.963,153.131 301.963,8.593'
				    />
				
				    <radialGradient id='honey-fill' cx='302' cy='299.969' r='272.881' gradientUnits='userSpaceOnUse'>
				
				        <stop offset='0' stopColor='#fed086' />
				
				        <stop offset='0.964' stopColor='#fbb03b' />
				
				    </radialGradient>
				
				    <polygon  className={`honey ${isAbout ? "comb-fill" : " "}`} points='555,155.432 555.037,446.808 302.037,591.346 49,444.507 48.963,153.131 301.963,8.593'
				    />

				</svg>

				<NavLink to="/about" className="nav-link" activeClassName="selected">about</NavLink>
				
			</div>
		)
	}
}