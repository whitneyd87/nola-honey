import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comb from './comb.js';
import Content from './content.js';
import Ordercomb from './ordercomb.js';
import Aboutcomb from './aboutcomb.js';
import Contactcomb from './contactcomb.js';


export default class Hive extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isShown: false,
			isNav: false
		}
		this.orderComb = React.createRef();
		this.aboutComb = React.createRef();
		this.contactComb = React.createRef();

		this.handleScroll = this.handleScroll.bind(this);
	}

	handleScroll() {
		var y = window.scrollY;
		if( y > 50 ) {
			this.setState({
				isNav: true
			});
		} else {
			this.setState({
				isNav: false
			});
		}
	}

	componentWillMount() {
		sessionStorage.getItem('isShown') && this.setState({
		
			isShown: JSON.parse(sessionStorage.getItem('isShown'))
		});
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	handleOrder() {
		this.setState({
			isShown: true
		});	
		this.orderComb.current.fillComb();
		this.aboutComb.current.emptyComb();
		this.contactComb.current.emptyComb();

		sessionStorage.setItem('isShown', true);
	}	

	handleAbout() {
		this.setState({
			isShown: false
		});	
		this.orderComb.current.emptyComb();
		this.aboutComb.current.fillComb();
		this.contactComb.current.emptyComb();

		sessionStorage.setItem('isShown', false);
	}	

	handleContact() {
		this.orderComb.current.emptyComb();
		this.aboutComb.current.emptyComb();
		this.contactComb.current.fillComb();
	}

	render () {

		const{isShown} = this.state;
		const{isNav} = this.state;
		
		return (

			<section className="hive">

				<nav className={`${isNav ? "sideNav" : "sideNavHide"}`}>

					<ul>

						<li>

							<NavLink to={"/about"} className="sideLink" onClick={()=> this.handleAbout()}>
								
								<FontAwesomeIcon icon={["fas", "info"]} size="xs" />
							
							</NavLink> 

						</li>

						<li>

							<NavLink to={"/merch"} className="sideLink" onClick={()=> this.handleOrder()}>
								
								<FontAwesomeIcon icon={["fas", "tint"]} size="xs" />
							
							</NavLink> 

						</li>

						<li>

							<NavLink to={"/merch"} className="sideLink" onClick={()=> this.handleOrder()}>
								
								<FontAwesomeIcon icon={["fas", "tshirt"]} size="xs" />
							
							</NavLink> 

						</li>

						<li>

							<NavLink to={"/merch"} className="sideLink" onClick={()=> this.handleOrder()}>
								
								<FontAwesomeIcon icon={["fas", "coffee"]} size="xs" />
							
							</NavLink> 

						</li>

						<li>

							<NavLink to={"/contact"} className="sideLink" onClick={()=> this.handleContact()}>
								
								<FontAwesomeIcon icon={["fas", "at"]} size="xs" />
							
							</NavLink> 

						</li>

					</ul>

				</nav>

				<section className="row">

					<Comb />

					<div className="nav-comb" onClick={()=> this.handleOrder()}>

						<Ordercomb ref={this.orderComb}/>	

					</div>

					<figure className="honeypotFigure">

						<img className={`honeypotImage ${isShown ? "honeypotActive" : " "}`} src={ require ('./img/honeypot.png') } alt="honey pot" />

					</figure>

				</section>	

				<section className="row middle-hive">

					<Comb />

					<div className="nav-comb" onClick={()=> this.handleAbout()}>

						<Aboutcomb ref={this.aboutComb}/>

					</div>

					<Comb />

				</section>

				<section className="row">		

					<Comb />

					<div className="nav-comb" onClick={()=> this.handleContact()}>

						<Contactcomb ref={this.contactComb} />	

					</div>

				</section>

				<section className="content">

					<Content />

				</section>

			</section>

		)
		

	}

}