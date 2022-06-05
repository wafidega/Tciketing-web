import React, { Component } from "react";
import "./index.css";
import "react-bootstrap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "../../utils/axios";
import qs from "query-string";
import CardSchedule from "../../components/CardScheduleDetail";

const dateNow = new Date().toISOString().split("T")[0];

class Detail extends Component {
  constructor(props) {
    super(props);
    const urlParams = qs.parse(props.location.search);
    this.state = {
      data: [],
      dataSchedule: [],
      pageSchedule: 1,
      limitSchedule: 10,
      timeSchedule: "",
      selectedTime: true,
      dateSchedule: dateNow,
      scheduleId: "",
      pageInfoSchedule: {},
      movieId: urlParams.movieId,
      location: "",
    };
  }
  componentDidMount() {
    this.getDataMovieById();
    this.getDataSchedule();
  }

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
  getDataSchedule = () => {
    console.log(this.state.movieId);
    console.log(this.state.location);
    axios
      .get(
        `/schedule?location=${this.state.location}&movieId=${this.state.movieId}&page=${this.state.pageSchedule}&limit=${this.state.limitSchedule}`
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
  // Push
  handleOrder = (id) => {
    console.log(id);
    // this.setState({
    //   scheduleId: id,
    // });
    const { movieId, scheduleId, dateSchedule, timeSchedule } = this.state;
    console.log(movieId);
    console.log(scheduleId);
    console.log(timeSchedule);
    console.log(dateSchedule);
    this.props.history.push("/order", {
      movieId,
      scheduleId: id,
      dateSchedule,
      timeSchedule,
    });
  };
  // Handle time
  handleTime = (dataTime) => {
    this.setState({
      timeSchedule: dataTime,
    });
    console.log(this.state.timeSchedule);
    // console.log(dataTime);
  };
  // Handle Date
  handleChangeDate = (event) => {
    // if (condition jika user memilih tanggal hari sebelumnya) {
    //   console.log("tanggal tidak bisa di akses");
    // }
    this.setState(
      {
        dateSchedule: event.target.value,
      },
      () => {
        // proses function get schedule
        // this.getDataSchedule();
      }
    );
  };
  render() {
    console.log(this.state.timeSchedule);
    const { data } = this.state;
    return (
      <>
        <Navbar></Navbar>
        {data.map((item) => (
          <div className="detail-movie">
            <div className="row">
              <div className="col-md-6">
                <center>
                  <img
                    src={`http://localhost:3001/upload/movie/${item.image}`}
                    alt="image-detail"
                    className="image-detail"
                  />
                </center>
              </div>
              <div className="col-md-6">
                <h1>{item.name}</h1>
                <p>{item.genre}</p>
                <div class="row">
                  <div class="col-sm-3">
                    <p>Release date</p>
                    <p>{new Date(item.releaseDate).toDateString()}</p>
                    <p>Duration</p>
                    <p>{item.duration} </p>
                  </div>
                  <div class="col-sm-3">
                    <p>Directed by</p>
                    <p>{item.director}</p>
                    <p>Casts</p>
                    <p>{item.cast}</p>
                  </div>

                  <h3>Synopsis</h3>
                  <p>{item.synopsis}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Showdows */}
        <div class="Showdown">
          <div class="dropdown__show">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <h4 className="show-times">
                  Select Date and Choose Your Movie Schedule
                </h4>
                <div class=" row">
                  <div class="col text-center">
                    <div class="dropdown">
                      <input
                        type="date"
                        value={this.state.dateSchedule}
                        onChange={this.handleChangeDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3"></div>
            </div>
          </div>
          {/* Dropdown end */}
          {/* Content */}
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
                            handlePayment={this.handlePayment}
                            handleTime={this.handleTime}
                            handleOrder={this.handleOrder}
                          ></CardSchedule>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div class="col-md-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content end */}

        {/* Footer */}
        <Footer></Footer>
      </>
    );
  }
}
export default Detail;
