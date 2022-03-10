import React from "react";
import Yummy from "../images/yummyEmoji.png";
import HiveCell from "../images/hiveCell.jpg";
import Bees from "../images/bees.jpg";
import { NavHashLink as NavLink } from "react-router-hash-link";

class AboutView extends React.Component {
  render() {
    return (
      <section className="about-wrapper">
        <div className="origin-story">
          <figure className="about-figure">
            <img
              className="about-photo"
              src={HiveCell}
              alt="bee keeper holding a hive cell"
            />
          </figure>
          <div className="about-content">
            <h4>Our Story</h4>
            <p className="about-text">
              Nola Honey was founded in 2018. We are locally owned and operated,
              organic raw honey producers. We believe in doing things nature’s
              way without the use of chemicals.
            </p>
          </div>
        </div>
        <div className="mission-statement">
          <figure className="about-figure">
            <img
              className="about-photo"
              src={Bees}
              alt="close up of bees on a hive cell"
            />
          </figure>
          <div className="about-content">
            <h4>Our Mission</h4>
            <p className="about-text">
              To provide the Greater New Orleans Area with the pure, sweet taste
              of local honey. We work hard to insure our honey is as good for
              your health as it is to your tummy.{" "}
              <img className="yummy-emoji" src={Yummy} alt="yum emoji" />
            </p>
          </div>
        </div>
        <div className="accredit"></div>
      </section>
    );
  }
}

export default AboutView;
