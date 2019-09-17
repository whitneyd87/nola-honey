import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Contact extends Component {

	render () {

		return (

			<div className= "content-wrapper">

				<div className="contact-info">

					<h1>Get in Touch</h1>

					<address className="contact-address"> 
						<a href={"tel:+15045554444"} target={"_blank"}>(504) 555 - 4444</a> <br/>
					 	<a href={"mailto:yum@nolahoney.com"} target={"_blank"}>yum@nolahoney.com</a>
					 </address> 

					 <div className="social-network">

						<a href={"https://www.facebook.com/"} target={"_blank"} className="social-media">
							<FontAwesomeIcon icon={["fab", "facebook-f"]} size="3x" />
						</a> 

						<a href={"https://www.instagram.com/?hl=en"} target={"_blank"} className="social-media">
							<FontAwesomeIcon icon={["fab", "instagram"]} size="3x" />
						</a> 

						<a href={"https://twitter.com/?lang=en"} target={"_blank"} className="social-media">
							<FontAwesomeIcon icon={["fab", "twitter"]} size="3x" />
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
