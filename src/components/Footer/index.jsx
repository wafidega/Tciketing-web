import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Image, Card, Button } from "react-bootstrap";
import Logo from "../../assets/image/Vector.png";
import LogoEbu from "../../assets/image/ebu.png";
import LogoCinema from "../../assets/image/cine.png";
import logoHitFlix from "../../assets/image/hit.png";
import "./index.css";

class Footer extends Component {
  render() {
    return (
      <>
        <footer>
          <div className="row">
            <div className="footer__one col-md-3 ">
              <img src={Logo} alt="" />
              <p>
                Stop waiting in line. Buy tickets conveniently, watch movies
                quietly.
              </p>
            </div>
            <div className="footer__two col-md-3 mx-auto">
              <a href="#" class="explore nav-link">
                Explore
              </a>
              <a href="#" class="footer__content nav-link">
                Cinemas
              </a>
              <a href="#" class="footer__content nav-link">
                Movie List
              </a>
              <a href="#" class="footer__content nav-link">
                My Ticket
              </a>
              <a href="#" class="footer__content nav-link">
                Notification
              </a>
            </div>
            <div className="footer__three col-md-3">
              <a href="#" class="explore nav-link">
                Our Sponsor
              </a>
              <img src={LogoEbu} alt="" />
              <div className="img__two">
                <img src={LogoCinema} alt="" />
              </div>
              <img src={logoHitFlix} alt="" />
            </div>
            <div className="footer__four col-md-3">
              <a href="#" className="explore nav-link">
                Follow Us
              </a>
              <a href="#" className="footer__content nav-link">
                Tickitz Cinema id
              </a>
              <a href="#" className="footer__content nav-link">
                tickitz.id
              </a>
              <a href="#" className="footer__content nav-link">
                tickitz.id
              </a>
              <a href="#" className="footer__content nav-link">
                Tickitz Cinema id
              </a>
            </div>
          </div>
          <p className="copyright">© 2020 Tickitz. All Rights Reserved.</p>
        </footer>
      </>
    );
  }
}

export default Footer;
