import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Contact extends Component {

	constructor(props) {
		super(props);
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

	render () {

		return (

			<div className= "content-wrapper" ref={this.scrollIntoFocus}>

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

				<div className="contact-info">

					<h1>Get in Touch</h1>

					<address className="contact-address"> 
						<a href={"tel:+15045554444"} target={"_blank"}>(504) 555 - 4444</a> <br/>
					 	<a href={"mailto:yum@nolahoney.com"} target={"_blank"}>yum@nolahoney.com</a>
					 </address> 

					 <div className="social-network">

						<a href={"https://www.facebook.com/"} target={"_blank"} className="social-media">
							<FontAwesomeIcon icon={["fab", "facebook-f"]} size="2x" />
						</a> 

						<a href={"https://www.instagram.com/?hl=en"} target={"_blank"} className="social-media">
							<FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
						</a> 

						<a href={"https://twitter.com/?lang=en"} target={"_blank"} className="social-media">
							<FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
						</a> 

					</div>

				</div>

				<div className="sign-up">

					<h1>Join the Hive</h1>

					<p className="mailing-list">Sign up for Our Mailing List & we'll <br />send you all our buzz worthy news!</p>

					<div className="email-container">

						<input type="email" />
						
						<input id="emailBtn" type="submit" value="fly" />

					</div>

				</div>
				
			</div>

		)

	}

}
