import React, { Component } from "react";
import logo from "url:../../../public/images/logo.png";
import "../../static/AboutUs.css";
import { Facebook } from "react-bootstrap-icons";
import { Twitter } from "react-bootstrap-icons";
import { Linkedin } from "react-bootstrap-icons";

class AboutUs extends Component {
  render() {
    return (
      <div>
        <div className="head-color">
          <div className="div-logo">
            <img className="logo" src={logo} alt="logo" />
          </div>
          <div className="div-topic">
            <h1 className="aboutUs">About Us</h1>
          </div>
        </div>

        <div className="about-us-text">
          <div className="main-text">
            <h1 className="mainText">Who We Are?</h1>
          </div>

          <div className="secondary-text">
            <p className="secondaryText">
              Your About Us page should be: Informative. It doesn't always have
              to tell your whole story, but it should at least provide people
              with an idea of . Contain social proof, testimonials, and some
              personal information that visitors can relate to, such as
              education, family, etc.
            </p>

            <p className="secondaryText">
              Your About Us page should be: Informative. It doesn't always have
              to tell your whole story, but it should at least provide people
              with an idea of . Contain social proof, testimonials, and some
              personal information that visitors can relate to, such as
              education, family, etc. Your About Us page should be: Informative.
              It doesn't always have to tell your whole story, but it should at
              least provide people with an idea of . Contain social proof,
              testimonials, and some personal information that visitors can
              relate to, such as education, family, etc.
            </p>
          </div>
          <button className="contactUs-Button" onClick={ButtonClick}>
            Contact Us
          </button>

          <div className="contactUs">
            <a href="https://www.facebook.com">
              <Facebook size={40} style={{ margin: "10px" }} />
            </a>
            <a href="https://www.twitter.com">
              <Twitter size={40} style={{ margin: "10px" }} />
            </a>
            <a href="https://www.linkedin.com">
              <Linkedin size={40} style={{ margin: "10px" }} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const ButtonClick = () => {
  console.log("dfsdfhdfdfsjdgfhjshdfhjhgfhdsgfdsf");
  var a;
  if (a == 1) {
    document.getElementsByClassName("contactUs").style.display = "block";
    return (a = 0);
  } else {
    document.getElementsByClassName("contactUs").style.display = "none";
    return (a = 1);
  }
};

export default AboutUs;
