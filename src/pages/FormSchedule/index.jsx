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
import CardSchedule from "../../components/CardSchedule";
import Ebu from "../../assets/image/ebu.png";
import { toast, ToastContainer } from "react-toastify";

class FormSchedule extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      page: 1,
      limit: 100,
      location: "",
      pageInfo: {},
      dataSchedule: [],
      pageSchedule: 1,
      limitSchedule: 10,
      pageInfoSchedule: {},
      form: {
        movieId: "",
        premiere: "",
        price: "",
        location: "",
        dateStart: "",
        dateEnd: "",
        time: [],
      },
      isUpdate: false,
      idSchedule: "",
      showInputTime: false,
    };
  }
  componentDidMount = () => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      this.props.history.push("/home");
    }
    this.getDataSchedule();
    this.getDataMovie();
  };
  getDataSchedule = () => {
    axios
      .get(
        `/schedule?location=${this.state.location}&movieId=&page=${this.state.pageSchedule}&limit=${this.state.limitSchedule}`
      )
      .then((res) => {
        console.log(res, "res schedule");
        this.setState({
          dataSchedule: res.data.data,
          pageInfoSchedule: res.data.pagination,
        });
        console.log(this.state.dataSchedule);
      })
      .catch((err) => {
        console.log(err.response);
      });
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
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  // Search
  changeSearch = (event) => {
    this.setState({
      location: this.state.search,
      [event.target.name]: event.target.value,
    });
  };
  handleSearch = (event) => {
    console.log(this.state.location);
    this.getDataSchedule();
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

  showTime = () => {
    this.setState({
      showInputTime: true,
    });
  };

  handleTime = (event) => {
    if (event.key === "Enter") {
      this.setState({
        form: {
          ...this.state.form,
          time: [...this.state.form.time, event.target.value],
        },
        showInputTime: false,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newTime = this.state.form.time.join(",");
    console.log(newTime);
    const setData = {
      form: {
        ...this.state.form,
        time: newTime,
      },
    };
    console.log(setData);

    // const formData = new FormData();
    // for (const data in this.state.form) {
    //   formData.append(data, this.state.form[data]);
    // }
    // for (const data of formData.entries()) {
    //   console.log(data[0], data[1]);
    // }
    axios
      .post("schedule", setData.form)
      .then((res) => {
        console.log(res);
        toast.success("Success Create Schedule", {
          theme: "colored",
        });
        this.getDataSchedule();
        this.handleReset();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  // Update
  setUpdate = (data) => {
    this.setState({
      idSchedule: data.id,
      form: {
        movieId: data.movieId,
        premiere: data.premiere,
        price: data.price,
        location: data.location,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        time: data.time,
      },
      isUpdate: true,
    });
    console.log("update", data);
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const newTime = this.state.form.time.join(",");
    console.log(newTime);
    const setData = {
      form: {
        ...this.state.form,
        time: newTime,
      },
    };
    console.log(setData);
    console.log("handleUpdate", this.state.form);
    axios
      .patch(`schedule/${this.state.idSchedule}`, setData.form)
      .then((res) => {
        console.log(res);
        toast.success("Success Update Data", {
          theme: "colored",
        });
        this.getDataSchedule();
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

  // Reset
  handleReset = () => {
    this.setState({
      form: {
        movieId: "",
        premiere: "",
        price: "",
        location: "",
        dateStart: "",
        dateEnd: "",
        time: [],
      },
    });
  };

  handleDelete = (data) => {
    // e.preventDefault();
    console.log("handledelete", data);
    axios
      .delete(`schedule/${data.id}`, data)
      .then((res) => {
        toast.success("Success Delete Data", {
          theme: "colored",
        });
        this.getDataSchedule();
      })
      .catch((err) => {
        toast.error("Failed Delete Data", {
          theme: "colored",
        });
      });
  };

  handleDetail = (data) => {
    this.props.history.push(`/detail?movieId=${data}`);
    console.log(data);
  };

  handlePagination = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getDataMovie();
    });
  };
  render() {
    console.log(this.state.form);
    console.log(this.state.data);
    const { data, pageInfo } = this.state;
    return (
      <>
        <NavPor></NavPor>
        <main>
          {/* <!-- content --> */}
          <h3>FORM SCHEDULE</h3>
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
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="movieId"
                        onChange={this.changeText}
                        value={this.state.form.movieId}
                      >
                        <option selected>Select Movie</option>
                        {data.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="inputPassword4" class="form-label">
                        Location
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="location"
                        onChange={this.changeText}
                        value={this.state.form.location}
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail4" class="form-label">
                        price (rupiah)
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="price"
                        onChange={this.changeText}
                        value={this.state.form.price}
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="inputState" class="form-label">
                        Date Start
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        name="dateStart"
                        onChange={this.changeText}
                        value={this.state.form.dateStart}
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="inputPassword4" class="form-label">
                        Date End
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        name="dateEnd"
                        onChange={this.changeText}
                        value={this.state.form.dateEnd}
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="inputPassword4" class="form-label">
                        premiere
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="premiere"
                        onChange={this.changeText}
                        value={this.state.form.premiere}
                      >
                        <option selected>Select Studio</option>
                        <option value="Ebu.id">Ebu.id</option>
                        <option value="CineOne21">CineOne21</option>
                        <option value="hiflix">hiflix</option>
                      </select>
                    </div>
                    <div class="col-md-12">
                      <label for="inputPassword4" class="form-label">
                        Time
                      </label>
                      <br />
                      {/* <input
                        type="text"
                        class="form-control"
                        name="time"
                        onChange={this.changeText}
                      /> */}

                      {this.state.showInputTime ? (
                        <input type="text" onKeyPress={this.handleTime}></input>
                      ) : (
                        <button className="btn-time" onClick={this.showTime}>
                          +
                        </button>
                      )}
                      <hr />
                      {this.state.form.time.map((item, index) => (
                        <button
                          className="btn-time"
                          key={index}
                          value={this.state.form.time}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <div class="col-12">
                      <button
                        type="submit"
                        className="submit-button btn btn-primary"
                      >
                        {this.state.isUpdate ? "Update" : "Create Schedule"}
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
              <div className="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  id="search"
                  name="search"
                  placeholder="Your Premiere Location"
                  onChange={(event) => this.changeSearch(event)}
                />
              </div>
              <div className="col-md-6">
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
          <div class="card__content">
            <div class="first__line">
              <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                  <div class="row row-cols-1 row-cols-md-3 g-4">
                    {this.state.dataSchedule.map((item) => (
                      <div class="col">
                        <div className="now-film" key={item.id}>
                          <CardSchedule
                            data={item}
                            handleDelete={this.handleDelete}
                            setUpdate={this.setUpdate}
                          ></CardSchedule>
                        </div>
                      </div>
                    ))}
                    {/*  */}
                  </div>
                  <div class="col-md-1"></div>
                </div>
              </div>
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
export default FormSchedule;
