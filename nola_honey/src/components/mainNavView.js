import React from "react";
import {
  GenerateFigure,
  LogoNav,
  GenerateNav,
  GenerateHive,
} from "./helpers/navHelper.js";
import HoneyJarIcon from "../images/honeyjaricon.png";

class MainNavView extends React.Component {
  constructor(props) {
    super(props);
    this.initClasses = {
      header: "header",
      mainNav: "main-nav",
      logoWrapper: "logo-wrapper",
      logoLink: "logo-link",
      logoSocialWrapper: "logo-social-wrapper",
      socialMediaNav: "social-media-nav",
      beeWrapper: "bee-wrapper",
      hiveWrapper: "hive-wrapper",
      hiveRow: "hive-row",
      navHiveRow: "hive-row",
      combWrapper: "comb-wrapper",
      navLink: "nav-link",
      navLinkText: "nav-link-text",
    };
    this.updateClasses = {
      header: "header header-shrink",
      mainNav: "raised-nav",
      logoWrapper: "logo-wrapper",
      logoLink: "logo-link",
      logoSocialWrapper: "logo-social-wrapper",
      socialMediaNav: "social-media-nav",
      beeWrapper: "hide",
      hiveWrapper: "raised-hive-wrapper",
      hiveRow: "hide",
      navHiveRow: "hive-row",
      combWrapper: "comb-wrapper",
      navLink: "nav-link",
      navLinkText: "nav-link-text",
    };
    this.state = {
      classes: this.initClasses,
      signedIn: JSON.parse(localStorage.getItem("signedIn")),
      navLinks: {
        mainNav: ["about", "shop", "contact"],
        logInNav: ["create account", "|", "sign in"],
        socialNav: ["facebook", "instagram", "twitter"],
      },
    };

    this.handleClasses = this.handleClasses.bind(this);
  }

  handleClasses() {
    const location = window.location.hash;
    if (location !== "#/") {
      this.setState({
        classes: this.updateClasses,
      });
    } else {
      this.setState({
        classes: this.initClasses,
      });
    }
  }

  handleLoginNav() {
    const signedIn = this.state.signedIn;
    if (signedIn) {
      const loginLinks = this.state.navLinks.logInNav;
      const updateLoginNav = loginLinks.map((link, i) => {
        if (i === 0) link = "my account";
        if (i === 2) link = "sign out";
        return link;
      });
      const navLinks = this.state.navLinks;
      navLinks.logInNav = updateLoginNav;
      this.setState({ navLinks });
    }
  }

  componentDidMount() {
    this.handleClasses();
    this.handleLoginNav();
  }

  render() {
    const classes = this.state.classes;
    const navLinks = this.state.navLinks;
    const signedIn = this.state.signedIn;
    return (
      <header className={classes.header}>
        <div className={classes.mainNav} onClick={this.handleClasses}>
          <div className={classes.logoSocialWrapper}>
            <LogoNav classes={classes} />
            <GenerateNav
              classes={classes}
              type="login-nav"
              navLinks={navLinks.logInNav}
              signedIn={signedIn}
            />
            <figure className="honey-jar-icon">
              <img src={HoneyJarIcon} alt="honey jar icon" />
            </figure>
            <GenerateNav
              classes={classes}
              type="social-media-nav"
              navLinks={navLinks.socialNav}
            />
            <GenerateFigure type="bee" classes={classes} />
          </div>
          <GenerateHive
            classes={classes}
            type="main-nav"
            navLinks={navLinks.mainNav}
          />
        </div>
      </header>
    );
  }
}

export default MainNavView;
