import React, { Component } from 'react';
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
			isShown: false
		}
		this.orderComb = React.createRef();
		this.aboutComb = React.createRef();
		this.contactComb = React.createRef();
		this.honeyOrder = React.createRef();
		this.merchOrder = React.createRef();
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
	}


	render () {
		const{isMoved} = this.state;
		const{isShown} = this.state;
		
		return (

			<div className="hive">

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