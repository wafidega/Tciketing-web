import React, { Component } from "react";
import "./index.css";
import "react-bootstrap";
import Title from "../../assets/image/tickitz 1.png";
import Background from "../../assets/image/avenger.png";
import axios from "../../../src/utils/axios";
import { connect } from "react-redux";
import { login } from "../../stores/actions/auth";
import { getDataUser } from "../../stores/actions/dataUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        email: "",
        password: "",
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
    this.props
      .login(this.state.form)
      .then((res) => {
        // console.log(this.props.auth);
        // console.log(res);
        // localStorage.setItem("token", this.props.auth.idUser);
        console.log(this.props.getDataUser());
        localStorage.setItem("token", res.value.data.data.token);
        localStorage.setItem("id", res.value.data.data.id);
        const id = res.value.data.data.id;
        console.log(id);
        this.props.getDataUser(id).then((res) => {
          localStorage.setItem("role", res.value.data.data[0].role);
          const role = res.value.data.data[0].role;
          console.log(role);
          if (role === "admin") {
            toast.success("Success Login", {
              theme: "colored",
            });
            setTimeout(() => {
              this.props.history.push("/form-movie");
            }, 3000);
          } else {
            toast.success("Success Login", {
              theme: "colored",
            });
            setTimeout(() => {
              this.props.history.push("/home");
            }, 3000);
          }
        });
        // toast.success("Success Login", {
        //   theme: "colored",
        // });
        // setTimeout(() => {
        //   this.props.history.push("/home");
        // }, 3000);
      })
      // event.preventDefault();
      // console.log(this.state.form);
      // axios
      //   .post("auth/login", this.state.form)
      //   .then((res) => {
      //     console.log(res.data.data.token);
      //     localStorage.setItem("token", res.data.data.token);
      //     this.props.history.push("/home");
      //   })
      .catch((err) => {
        console.log(err.response);
        toast.warn(err.response.data.msg);
      });
  };

  handleReset = (event) => {
    event.preventDefault();
    // console.log("Reset Form");
  };
  render() {
    const { isError, msg, isLoading } = this.props.auth;
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
            <ToastContainer />
            <div className="login-content">
              <div className="title">Sign In</div>
              <p className="title-desc">
                Sign in with your data that entered during your registration
              </p>
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
                  <button className="btnSubmit btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
                <br />
                <div class="form-group">
                  <p class="forgot">
                    Don't have account?{" "}
                    <a href="/register" class="Reset" value="Login">
                      Register Now
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

const mapDispatchToProps = { login, getDataUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
