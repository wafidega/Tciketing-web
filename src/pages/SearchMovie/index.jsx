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

class SearchMovie extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      page: 1,
      limit: 20,
      pageInfo: {},
      month: "",
      search: "",
    };
  }
  componentDidMount = () => {
    this.handleSearch();
  };
  // getDataMovie = () => {
  //   axios
  //     .get(
  //       `movie?search=&sort=name&order=desc&page=${this.state.page}&limit=${this.state.limit}`
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({
  //         data: res.data.data,
  //         pageInfo: res.data.pagination,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };
  changeSearch = (event) => {
    this.setState({
      search: this.state.search,
      [event.target.name]: event.target.value,
    });
  };
  handleSearch = (event) => {
    console.log(this.state.search);
    axios
      .get(
        `movie?search=${this.state.search}&sort=name&order=desc&page=${this.state.page}&limit=${this.state.limit}`
      )
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data.data,
          pageInfo: res.data.pagination,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.search);
  };

  handleDetail = (data) => {
    this.props.history.push(`/detail?movieId=${data}`);
    console.log(data);
  };

  render() {
    console.log(this.state.data);
    const { data } = this.state;
    return (
      <>
        <Navbar></Navbar>
        <div className="search-movie">
          <div className="search">
            <h6 style={{ marginBottom: 20 }}>Data Movie</h6>
            <div className="row">
              <div className="col-md-4">
                <select id="inputState" class="form-select">
                  <option selected>Sort</option>
                  <option value="name">Name</option>
                </select>
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  class="form-control"
                  id="search"
                  name="search"
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
          <div className="card-group">
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
        <Footer></Footer>
      </>
    );
  }
}

export default SearchMovie;
