import React, { Component } from "react";
import "./index.css";
import "react-bootstrap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../assets/image/Group 14.png";
import Spiderman from "../../assets/image/spiderman.png";
import Widow from "../../assets/image/widow.png";
import axios from "../../utils/axios";
import Pagination from "react-paginate";
import CardMovie from "../../components/Card";
import CardNew from "../../components/CardHome";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataMovieMonth: [],
      page: 1,
      limit: 10,
      pageInfo: {},
      month: "",
    };
  }
  componentDidMount = () => {
    this.getDataMovie();
    this.getDataMovieByMonth();
  };
  getDataMovie = () => {
    axios
      .get(
        `movie?search=&sort=name&order=desc&page=${this.state.page}&limit=${this.state.limit}`
      )
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data.data,
          pageInfo: res.data.pagination,
        });
        console.log(this.state.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  // get data Movie By month
  getDataMovieByMonth = () => {
    axios
      .get(`movie/month/${this.state.month}`)
      .then((res) => {
        console.log(res);
        this.setState({
          dataMovieMonth: res.data.data,
        });
        console.log(this.state.dataMovieMonth);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  // Detail
  handleDetail = (data) => {
    this.props.history.push(`/detail?movieId=${data}`);
    console.log(data);
  };
  // To search
  handleSearchmovie = () => {
    this.props.history.push(`/search`);
  };

  render() {
    console.log(this.state.data);
    console.log(this.state.month);
    const { data } = this.state;
    return (
      <>
        <Navbar></Navbar>
        {/* banner */}
        <div className="container">
          <div className="row">
            <div className="col-6 banner-caption">
              <h2>Nearest Cinema, Newest Movie,</h2>
              <h1>Find out now!</h1>
            </div>
            <div className="col-6 banner-image">
              <img src={Banner} alt="bannerImage" />
            </div>
          </div>
        </div>
        {/* Banner end */}

        {/* Now Showing */}
        <div className="now-showing">
          <div className="row">
            <div className="col-md-6">
              <h1>Now Showing</h1>
            </div>
            <div className="col-md-6">
              <button
                type="button"
                className="button__searchMovie btn btn-primary"
                style={{ marginTop: 70 }}
                onClick={() => this.handleSearchmovie()}
              >
                Search Your Movie
              </button>
            </div>
          </div>
          {data.map((item) => (
            <img
              src={`http://localhost:3001/upload/movie/${item.image}`}
              alt=""
              className="comic__image"
              key={item.id}
              data={item}
            />
          ))}
        </div>
        {/* now showing end */}

        {/* upcoming */}
        <div className="upcoming">
          <h3>Upcoming Movie</h3>
          {/* button */}
          <div class="month">
            <button
              type="button"
              onClick={() => {
                this.setState(
                  {
                    month: "9",
                  },
                  () => {
                    this.getDataMovieByMonth();
                  }
                );
              }}
              className="button__first__month btn btn-primary"
            >
              September
            </button>
            <button
              type="button"
              onClick={() => {
                this.setState(
                  {
                    month: "10",
                  },
                  () => {
                    this.getDataMovieByMonth();
                  }
                );
              }}
              className="button__month btn btn-primary"
            >
              October
            </button>
            <button
              type="button"
              onClick={() => {
                this.setState(
                  {
                    month: "11",
                  },
                  () => {
                    this.getDataMovieByMonth();
                  }
                );
              }}
              className="button__month btn btn-primary"
            >
              November
            </button>
            <button
              type="button"
              className="button__month btn btn-primary"
              onClick={() => {
                this.setState(
                  {
                    month: "12",
                  },
                  () => {
                    this.getDataMovieByMonth();
                  }
                );
              }}
            >
              Desember
            </button>
            <button
              type="button"
              className="button__month btn btn-primary"
              onClick={() => {
                this.setState(
                  {
                    month: "1",
                  },
                  () => {
                    this.getDataMovieByMonth();
                  }
                );
              }}
            >
              January
            </button>
            <button
              type="button"
              className="button__month btn btn-primary"
              onClick={() => {
                this.setState(
                  {
                    month: "2",
                  },
                  () => {
                    this.getDataMovieByMonth();
                  }
                );
              }}
            >
              February
            </button>
            <button
              type="button"
              className="button__month btn btn-primary"
              onClick={() => {
                this.setState(
                  {
                    month: "3",
                  },
                  () => {
                    this.getDataMovieByMonth();
                  }
                );
              }}
            >
              March
            </button>
            <button
              type="button"
              className="button__month btn btn-primary"
              onClick={() => {
                this.setState(
                  {
                    month: "4",
                  },
                  () => {
                    this.getDataMovieByMonth();
                  }
                );
              }}
            >
              April
            </button>
          </div>
          {/* image */}
          <div className="upcoming__image">
            <div className="card-group">
              {this.state.dataMovieMonth.map((item) => (
                <div className="now-film" key={item.id}>
                  <CardMovie
                    data={item}
                    handleDetail={this.handleDetail}
                  ></CardMovie>
                </div>
              ))}
            </div>
          </div>
          {/* image end */}
        </div>
        {/* upcoming end */}

        {/* content join */}
        <div className="content__banner">
          <div className="container">
            <div className="join text-center">
              <div className="join__desc">
                <h2>Be the vanguard of the</h2>
                <h1>Moviegoers</h1>
              </div>
              <div className="join__input">
                <input type="email" placeholder="Type your email" />
                <button className="btn btn-primary button-join">
                  Join now
                </button>
              </div>
              <div className="join__caption">
                <p>
                  By joining you as a Tickitz member, <br />
                  we will always send you the latest updates via email .
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }
}

export default Home;
