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

			<section className= "content-wrapper" ref={this.scrollIntoFocus}>

				<div className="contact-info">

					<h2>Get in Touch</h2>

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

					<h2>Join the Hive</h2>

					<p className="mailing-list">Sign up for Our Mailing List to get all things buzz worthy!</p>

					<div className="email-container">

						<input type="email" />
						
						<input id="emailBtn" type="submit" value="fly" />

					</div>

				</div>
				
			</section>

		)

	}

}
