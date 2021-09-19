import React from "react";

class ContactView extends React.Component {
  constructor(props) {
    super(props);
    this.email = "yummy@nolahoney.com";
    this.phoneNo = {
      countryCode: 1,
      areaCode: 504,
      phoneNo: 5554433,
    };
  }

  render() {
    return (
      <section className="contact-wrapper">
        <div className="contact-info">
          <h4>Get in Touch</h4>
          <div className="contact-links">
            <a href={`tel:+15045554444`} rel="noreferrer" target={"_blank"}>
              15045554433
            </a>
            <a
              href={"mailto:yum@nolahoney.com"}
              rel="noreferrer"
              target={"_blank"}
            >
              yummy@nolahoney.com
            </a>
          </div>
        </div>
        <div className="mailing-list">
          <h4>Join the Hive</h4>
          <p className="mailing-list-text">
            Sign up for Our Mailing List to get all things buzz worthy!
          </p>
          <div className="sign-up-wrapper">
            <input className="email" type="email" />
            <input className="email-btn" type="submit" value="fly" />
          </div>
        </div>
      </section>
    );
  }
}

export default ContactView;
