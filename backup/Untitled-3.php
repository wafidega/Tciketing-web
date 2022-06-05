<section classNameName="body">
        <section className="banner">
      <div className="banner__overlay">
        <img src={Title} alt="jumbotron" className="banner__overlay--jumbotron" />
        <span className="banner__overlay__title">wait, watch, wow!</span>
      </div>
      <img src={Background} alt="banner" className="img__login" />
    </section>
    <section className="login">
      <h3>SIGN IN</h3>
      <p>Sign in with your data that you entered during
        your registration</p>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Your Email *" value="" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Your Password *" value="" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Login" style="width: 100%;" />
                        </div>
                        <br/>
                        <div className="form-group">

                            <p style="text-align: center;">Forgot Password <a href="#" className="ForgetPwd" value="Login" style="color: #5F2EEA;">RESET NOW</a></p>
                        </div>
                    </form>
    </section>
        </section>