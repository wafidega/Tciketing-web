import React, { Component } from "react";
import "./index.css";
import "react-bootstrap";
import NavPor from "../../components/NavPor";
import Footer from "../../components/Footer";
import Spiderman from "../../assets/image/spiderman.png";
import Widow from "../../assets/image/widow.png";
import Witch from "../../assets/image/witch.png";
import axios from "../../utils/axios";
import Pagination from "react-paginate";
import CardMovie from "../../components/Card";
import qs from "query-string";

class UpdateMovie extends Component {
  constructor(props) {
    super(props);
    const urlParams = qs.parse(props.location.search);
    this.state = {
      data: [],
      movieId: urlParams.movieId,
      page: 1,
      limit: 3,
      pageInfo: {},
      form: {
        name: "",
        genre: "",
        director: "",
        duration: "",
        cast: "",
        releaseDate: "",
        synopsis: "",
        image: null,
      },
    };
  }
  componentDidMount = () => {
    this.getDataMovie();
  };
  getDataMovie = () => {
    axios
      .get(
        `movie?search=h&sort=id&order=desc&page=${this.state.page}&limit=${this.state.limit}`
      )
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data.data,
          pageInfo: res.data.pagination,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  getDataMovieById = () => {
    axios
      .get(`movie/${this.state.movieId}`)
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data.data,
          pageInfo: res.data.pagination,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // Create Form Movie
  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  changeFile = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.files[0],
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.form);

    const formData = new FormData();

    for (const data of formData.entries()) {
    }
  };

  handleDelete = () => {
    axios.delete();
  };

  handleDetail = (data) => {
    this.props.history.push(`/update-movie?movieId=${data}`);
    console.log(data);
  };
  render() {
    console.log(this.state.data);
    const { data } = this.state;
    return (
      <>
        <NavPor></NavPor>
        <main>
          {/* <!-- content --> */}
          <h3>FORM MOVIE</h3>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
              <div class="form-movie">
                <div class="content">
                  <div class="row">
                    <div class="col-md-5">
                      <center>
                        <image src={Spiderman} alt="" />
                      </center>
                    </div>
                    <div class="col-md-7">
                      {data.map((item) => (
                        <form class="row g-3" onSubmit={this.handleSubmit}>
                          <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">
                              Movie Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="name"
                              onChange={(event) => this.changeText(event)}
                              value={item.name}
                            />
                          </div>
                          <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">
                              Genre
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="genre"
                              onChange={(event) => this.changeText(event)}
                              value={item.genre}
                            />
                          </div>
                          <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">
                              Director
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="director"
                              onChange={(event) => this.changeText(event)}
                              value={item.director}
                            />
                          </div>
                          <div class="col-md-6">
                            <label for="inputState" class="form-label">
                              Duration
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="duration"
                              onChange={(event) => this.changeText(event)}
                              value={item.duration}
                            />
                          </div>
                          <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">
                              Cast
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="cast"
                              onChange={(event) => this.changeText(event)}
                              value={item.cast}
                            />
                          </div>
                          <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">
                              Date
                            </label>
                            <input
                              type="date"
                              name="releaseDate"
                              class="form-control"
                              onChange={(event) => this.changeText(event)}
                              value={item.date}
                            />
                          </div>
                          <div class="col-md-12">
                            <label for="inputPassword4" class="form-label">
                              Sinopsis
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="synopsis"
                              onChange={(event) => this.changeText(event)}
                              value={item.synopsis}
                            />
                          </div>
                          <div class="col-md-12">
                            <label for="inputPassword4" class="form-label">
                              Image
                            </label>
                            <input
                              type="file"
                              name="image"
                              class="form-control"
                              onChange={(event) => this.changeFile(event)}
                              value={item.image}
                            />
                          </div>
                          <div class="col-12">
                            <button
                              type="submit"
                              className="submit-button btn btn-primary"
                            >
                              Update Change
                            </button>
                          </div>
                        </form>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-1"></div>
          </div>
          {/* <!-- Search --> */}
          <div class="search">
            <div class="row">
              <div class="col-md-6">
                <h6>Data Movie</h6>
              </div>
              <div class="col-md-4">
                <select id="inputState" class="form-select">
                  <option selected>Sort</option>
                  <option>...</option>
                </select>
              </div>
              <div class="col-md-2">
                <input type="text" class="form-control" id="inputZip" />
              </div>
            </div>
          </div>
          {/* <!-- Search end --> */}

          {/* <!-- Data Movie --> */}
          <div class="upcoming__image">
            <div class="card-group">
              {data.map((item) => (
                <div className="now-film" key={item.id}>
                  <CardMovie
                    data={item}
                    handleDetail={this.handleDetail}
                  ></CardMovie>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer></Footer>
      </>
    );
  }
}
export default UpdateMovie;
