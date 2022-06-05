import React, { Component, useState } from "react";
import "./index.css";
import "react-bootstrap";
import NavPor from "../../components/NavPor";
import Footer from "../../components/Footer";
import Spiderman from "../../assets/image/spiderman.png";
import Widow from "../../assets/image/widow.png";
import Witch from "../../assets/image/witch.png";
import axios from "../../utils/axios";
import Pagination from "react-paginate";
import CardMovieForm from "../../components/CardForm";
import { toast, ToastContainer } from "react-toastify";

class FormMovie extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      page: 1,
      limit: 10,
      search: "",
      sort: "",
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
      isUpdate: false,
      idMovie: "",
    };
  }
  componentDidMount = () => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      this.props.history.push("/home");
    }
    this.getDataMovie();
  };
  getDataMovie = () => {
    axios
      .get(
        `movie?search=${this.state.search}&sort=${this.state.sort}&order=desc&page=${this.state.page}&limit=${this.state.limit}`
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
    for (const data in this.state.form) {
      formData.append(data, this.state.form[data]);
    }
    for (const data of formData.entries()) {
      console.log(data[0], data[1]);
    }
    axios
      .post("movie", formData)
      .then((res) => {
        console.log(res);
        toast.success("Success create Data", {
          theme: "colored",
        });
        this.getDataMovie();
        this.handleReset();
      })
      .catch((err) => {
        toast.error("Failed Create Data, please fill all the form", {
          theme: "colored",
        });
        console.log(err.response);
      });
  };
  // Update
  setUpdate = (data) => {
    this.setState({
      idMovie: data.id,
      form: {
        name: data.name,
        genre: data.genre,
        director: data.director,
        duration: data.duration,
        cast: data.cast,
        releaseDate: data.releaseDate,
        synopsis: data.synopsis,
        image: data.image,
      },
      isUpdate: true,
    });
    console.log("update", data);
  };

  handleUpdate = (e) => {
    e.preventDefault();
    console.log("handleUpdate", this.state.form);
    console.log(this.state.idMovie);
    const formData = new FormData();
    for (const data in this.state.form) {
      formData.append(data, this.state.form[data]);
    }
    for (const data of formData.entries()) {
      console.log(data[0], data[1]);
    }
    // const formData = new FormData();
    // for (const data in this.state.form) {
    //   formData.append(data, this.state.form[data]);
    // }
    // for (const data of formData.entries()) {
    //   console.log(data[0], data[1]);
    // }
    // console.log(formData);
    axios
      .patch(`movie/${this.state.idMovie}`, formData)
      .then((res) => {
        console.log(res);
        toast.success("Success Update Data", {
          theme: "colored",
        });
        this.getDataMovie();
        this.handleReset();
        this.setState({
          isUpdate: false,
        });
      })
      .catch((err) => {
        toast.error("Failed Update Data", {
          theme: "colored",
        });
        console.log(err.response);
      });
  };

  // reset
  handleReset = () => {
    this.setState({
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
    });
  };
  // Delete
  handleDelete = (data) => {
    // e.preventDefault();
    console.log("handledelete", data);
    axios
      .delete(`movie/${data.id}`, data)
      .then((res) => {
        toast.success("Success Delete Data", {
          theme: "colored",
        });
        this.getDataMovie();
      })
      .catch((err) => {
        toast.error("Failed Delete Data", {
          theme: "colored",
        });
      });
  };
  // Menuju Detail
  handleDetail = (data) => {
    this.props.history.push(`/detail?movieId=${data}`);
    console.log(data);
  };
  // Pagination
  handlePagination = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getDataMovie();
    });
  };
  // Search
  changeSearch = (event) => {
    this.setState({
      search: this.state.search,
      [event.target.name]: event.target.value,
    });
  };
  changeSorting = (event) => {
    this.setState({
      sort: this.state.search,
      [event.target.name]: event.target.value,
    });
  };
  handleSearch = (event) => {
    console.log(this.state.search);
    console.log(this.state.sort);
    this.getDataMovie();
  };
  render() {
    console.log(this.state.data);
    const { data, pageInfo } = this.state;
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
                  <ToastContainer />
                  <form
                    class="row g-3"
                    onSubmit={
                      this.state.isUpdate
                        ? this.handleUpdate
                        : this.handleSubmit
                    }
                  >
                    <div class="col-md-6">
                      <label for="inputEmail4" class="form-label">
                        Movie Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="name"
                        placeholder="Enter Movie Name"
                        onChange={(event) => this.changeText(event)}
                        value={this.state.form.name}
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
                        placeholder="Enter Genre Movie"
                        onChange={(event) => this.changeText(event)}
                        value={this.state.form.genre}
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
                        placeholder="Enter Director Movie"
                        onChange={(event) => this.changeText(event)}
                        value={this.state.form.director}
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
                        placeholder="Enter Movie Duration"
                        onChange={(event) => this.changeText(event)}
                        value={this.state.form.duration}
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
                        placeholder="Enter Movie Cast"
                        onChange={(event) => this.changeText(event)}
                        value={this.state.form.cast}
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
                        placeholder="Enter Release Date"
                        onChange={(event) => this.changeText(event)}
                        value={this.state.form.releaseDate}
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
                        placeholder="Enter Movie Synopsis"
                        onChange={(event) => this.changeText(event)}
                        value={this.state.form.synopsis}
                      />
                    </div>
                    <div class="col-md-12">
                      <label for="inputPassword4" class="form-label">
                        Image
                      </label>
                      {/* <a
                        href={`http://localhost:3001/upload/movie/${this.state.form.image}`}
                      >
                        Check File
                      </a> */}
                      <input
                        type="file"
                        name="image"
                        class="form-control"
                        onChange={(event) => this.changeFile(event)}
                      />
                    </div>
                    <div class="col-12">
                      <button
                        type="submit"
                        className="submit-button btn btn-primary"
                      >
                        {this.state.isUpdate ? "Update" : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-1"></div>
          </div>
          {/* <!-- Search --> */}
          {/* <div class="search">
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
          </div> */}
          <div className="search">
            <h6 style={{ marginBottom: 20 }}>Data Movie</h6>
            <div className="row">
              <div className="col-md-4">
                <select
                  id="inputState"
                  class="form-select"
                  name="sort"
                  onChange={(event) => this.changeSorting(event)}
                  value={this.state.sort}
                >
                  <option selected>Sort</option>
                  <option value="name" key="name">
                    Name (A-Z)
                  </option>
                  <option value="cast" key="cast">
                    Cast (A-Z)
                  </option>
                </select>
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  class="form-control"
                  id="search"
                  name="search"
                  placeholder="Search Your Movie"
                  onChange={(event) => this.changeSearch(event)}
                />
              </div>
              <div className="col-md-4">
                <button
                  type="submit"
                  className="submit-button btn btn-primary"
                  onClick={this.handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Search end --> */}

          {/* <!-- Data Movie --> */}
          <div class="upcoming__image">
            <div class="card-group">
              {data.map((item) => (
                <div className="now-film" key={item.id}>
                  <CardMovieForm
                    data={item}
                    handleDetail={this.handleDetail}
                    setUpdate={this.setUpdate}
                    handleDelete={this.handleDelete}
                  ></CardMovieForm>
                </div>
              ))}
            </div>
          </div>
          <nav
            aria-label="..."
            previousLabel={"Previus"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageInfo.totalPage}
            onPageChange={this.handlePagination}
            containerClassName={"pagination"}
            disabledClassName={"pagination__dissable"}
            activeClassName={"pagination__active"}
          >
            <ul class="pagination pagination-lg">
              <li class="page-item active" aria-current="page">
                <span class="page-link">1</span>
              </li>
            </ul>
          </nav>
        </main>
        <Footer></Footer>
      </>
    );
  }
}
export default FormMovie;
