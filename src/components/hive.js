import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comb from './comb.js';
import Content from './content.js';
import Ordercomb from './ordercomb.js';
import Aboutcomb from './aboutcomb.js';
import Contactcomb from './contactcomb.js';
import HoneyLink from './honeyorder.js';
import MerchLink from './merchorder.js';


export default class Hive extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isMoved: true,
			isShown: false,
			isNav: false
		}
		this.orderComb = React.createRef();
		this.aboutComb = React.createRef();
		this.contactComb = React.createRef();
		this.honeyOrder = React.createRef();
		this.merchOrder = React.createRef();
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
		sessionStorage.getItem('isMoved') && sessionStorage.getItem('isShown') && this.setState({
			isMoved: JSON.parse(sessionStorage.getItem('isMoved')),
			isShown: JSON.parse(sessionStorage.getItem('isShown'))
		});
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	handleOrder() {
		this.setState({
			isMoved: false,
			isShown: true
		});	
		this.orderComb.current.fillComb();
		this.aboutComb.current.emptyComb();
		this.contactComb.current.emptyComb();
		this.honeyOrder.current.handleShow();
		this.merchOrder.current.handleShow();

		sessionStorage.setItem('isMoved', false);
		sessionStorage.setItem('isShown', true);
	}	

	handleAbout() {
		this.setState({
			isMoved: false,
			isShown: false
		});	
		this.orderComb.current.emptyComb();
		this.aboutComb.current.fillComb();
		this.contactComb.current.emptyComb();
		this.honeyOrder.current.handleHide();
		this.merchOrder.current.handleHide();

		sessionStorage.setItem('isMoved', false);
		sessionStorage.setItem('isShown', false);
	}	

	handleContact() {
		this.setState({
			isMoved: false,
			isShown: false
		});	
		this.orderComb.current.emptyComb();
		this.aboutComb.current.emptyComb();
		this.contactComb.current.fillComb();
		this.honeyOrder.current.handleHide();
		this.merchOrder.current.handleHide();

		sessionStorage.setItem('isMoved', false);
		sessionStorage.setItem('isShown', false);
	}

	render () {
		const{isMoved} = this.state;
		const{isShown} = this.state;
		const{isNav} = this.state;
		
		return (

			<div className="hive">

				<nav className={`${isNav ? "sideNav" : "sideNavHide"}`}>

					<ul>

						<li>

							<NavLink to={"/about"} className="sideLink" onClick={()=> this.handleAbout()}>
								
								<FontAwesomeIcon icon={["fas", "info"]} size="xs" />
							
							</NavLink> 

						</li>

						<li>

							<NavLink to={"/honey"} className="sideLink" onClick={()=> this.handleOrder()}>
								
								<FontAwesomeIcon icon={["fas", "tint"]} size="xs" />
							
							</NavLink> 

						</li>

						<li>

							<NavLink to={"/merch/shirts"} className="sideLink" onClick={()=> this.handleOrder()}>
								
								<FontAwesomeIcon icon={["fas", "tshirt"]} size="xs" />
							
							</NavLink> 

						</li>

						<li>

							<NavLink to={"/merch/mugs"} className="sideLink" onClick={()=> this.handleOrder()}>
								
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

					<div className={`transition empty ${isMoved ? " " : "empty-active"}`} >

						<Comb />

					</div>

					<div className={`transition merch ${isMoved ? " " : "merch-active"}`} >

						<HoneyLink ref={this.honeyOrder} />

					</div>

					<div className="nav-comb" >

						<MerchLink ref={this.merchOrder} />

					</div>

				</section>

				<div className="content">

					<Content />

				</div>

				<section className="row">		

					<div className={`nav-comb about ${ isMoved ? " " : "about-active"}`} onClick={()=> this.handleAbout()}>

						<Aboutcomb ref={this.aboutComb}/>	

					</div>

					<div className="nav-comb" onClick={()=> this.handleContact()}>

						<Contactcomb ref={this.contactComb} />	

					</div>

				</section>

			</div>

		)
		

	}

}