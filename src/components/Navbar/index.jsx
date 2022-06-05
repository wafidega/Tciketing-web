import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Image, Card, Button } from "react-bootstrap";
import Logo from "../../assets/image/Vector.png";
import axios from "../../../src/utils/axios";
import "./index.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    };
  }

  toLogin = () => {
    this.props.history.push("/login");
  };

  handleLogout = () => {
    axios.post("auth/logout");
    localStorage.clear();
    window.location.href = "/";
  };
  render() {
    return (
      <>
        <header>
          <nav className="navbar navbar-expand">
            <a href="#" class="navbar-brand">
              <img src={Logo}></img>
            </a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/home" className="header-home nav-link">
                  {" "}
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/profile" className="nav-link">
                  {" "}
                  Profile
                </a>
              </li>
            </ul>
            <ul className="navbar-item navbar-nav ms-auto">
              <i className="bi bi-search"></i>
              <button
                type="button"
                className="btn btn-primary button__logout"
                onClick={this.handleLogout}
              >
                Logout
              </button>
            </ul>
          </nav>
        </header>
      </>
    );
  }
}

export default Navbar;
