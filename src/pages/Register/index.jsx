import React, { Component } from "react";
import "./index.css";
import "react-bootstrap";
import Title from "../../assets/image/tickitz 1.png";
import Background from "../../assets/image/avenger.png";
import axios from "../../../src/utils/axios";
import { connect } from "react-redux";
import { register } from "../../stores/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      },
      isError: false,
      msg: "",
    };
  }
  handleChangeForm = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.form);
    // axios
    //   .post("auth/register", this.state.form)
    //   .then((res) => {
    //     toast.success("Register Success, please verify your email first!!");
    //     setTimeout(() => {
    //       this.props.history.push("/login");
    //     }, 3000);
    //   })
    //   .catch((err) => {
    //     toast.warn(err.response.data.msg);
    //   });
    this.props
      .register(this.state.form)
      .then((res) => {
        toast.success("Register Success, please verify your email first!!");
        setTimeout(() => {
          this.props.history.push("/login");
        }, 3000);
      })
      .catch((err) => {
        toast.warn(err.response.data.msg);
      });
  };

  handleReset = (event) => {
    event.preventDefault();
    // console.log("Reset Form");
  };
  render() {
    return (
      <>
        <section className="body">
          <section className="banner">
            <div className="banner__overlay">
              <img
                src={Title}
                alt="jumbotron"
                className="banner__overlay--jumbotron"
              />
              <span className="banner__overlay--slogan">wait, watch, wow!</span>
            </div>
            <img src={Background} alt="banner" className="banner__img" />
          </section>
          <section className="login">
            <div className="login-content">
              <div className="title">Sign Up</div>
              <p className="title__desc">Register your data first</p>
              <ToastContainer />
              <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <div class="form-group">
                  <input
                    type="email"
                    placeholder="Input email"
                    name="email"
                    class="form-control"
                    onChange={this.handleChangeForm}
                  />
                </div>
                <br />
                <div class="form-group">
                  <input
                    type="password"
                    placeholder="Input Password"
                    name="password"
                    class="form-control"
                    onChange={this.handleChangeForm}
                  />
                </div>
                <br />
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="first name"
                    name="first_name"
                    class="form-control"
                    onChange={this.handleChangeForm}
                  />
                </div>
                <br />
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="last name"
                    name="last_name"
                    class="form-control"
                    onChange={this.handleChangeForm}
                  />
                </div>
                <br />
                <div class="form-group">
                  <button className="btnSubmit btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
                <br />
                <div class="form-group">
                  <p class="forgot">
                    Already have account?{" "}
                    <a href="/login" class="Reset" value="Login">
                      Login Now
                    </a>
                  </p>
                </div>
              </form>
              <div className="forgot-pass">
                Forgot your password?{" "}
                <span>
                  {" "}
                  <a href=""> Reset now</a>
                </span>
              </div>
            </div>
          </section>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
