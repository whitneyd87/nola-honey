import React from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";
import { ReactComponent as HoneyComb } from "../../images/honeyComb.svg";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as Bee } from "../../images/bee.svg";

function GenerateFigure(props) {
  let figureImage;
  const classWrapper = props.type + "Wrapper";
  if (props.type === "bee") figureImage = <Bee />;
  if (props.type === "logo") figureImage = <Logo />;
  if (props.type === "comb") figureImage = <HoneyComb />;
  return (
    <figure className={props.classes[classWrapper]} onClick={props.onClick}>
      {figureImage}
    </figure>
  );
}

function LogoNav(props) {
  return (
    <NavLink className={props.classes.logoLink} to="/#">
      <GenerateFigure
        type="logo"
        classes={props.classes}
        onClick={props.onClick}
      />
    </NavLink>
  );
}

function GenerateLinks(props) {
  const navLinks = props.navLinks;
  return navLinks.map((link, i) => (
    <NavLink
      className={props.classes.navLink}
      to={`/${link === "|" ? "signin" : link.replace(" ", "")}`}
      key={i}
    >
      {props.type === "main-nav" && (
        <GenerateFigure type="comb" classes={props.classes} />
      )}
      <li className={props.classes.navLinkText} key={i}>
        {props.type === "social-media-nav" ? [...link].slice(0, 1) : link}
      </li>
    </NavLink>
  ));
}

function GenerateNav(props) {
  return (
    <ul className={props.type} onClick={props.onClick}>
      <GenerateLinks
        type={props.type}
        classes={props.classes}
        navLinks={props.navLinks}
        signedIn={props.signedIn}
      />
    </ul>
  );
}

function GenerateEmptyCombs(props) {
  const combNo = new Array(Number(props.combNo)).fill(0);
  return combNo.map((zero, i) => (
    <GenerateFigure type="comb" classes={props.classes} key={i} />
  ));
}

function GenerateHive(props) {
  return (
    <div className={props.classes.hiveWrapper}>
      <div className={props.classes.hiveRow}>
        <GenerateEmptyCombs classes={props.classes} combNo="2" />
      </div>
      <div className={props.classes.navHiveRow} onClick={props.onClick}>
        <GenerateLinks
          type="main-nav"
          classes={props.classes}
          navLinks={props.navLinks}
        />
      </div>
      <div className={props.classes.hiveRow}>
        <GenerateEmptyCombs classes={props.classes} combNo="2" />
      </div>
    </div>
  );
}

export { GenerateFigure, LogoNav, GenerateNav, GenerateHive };
