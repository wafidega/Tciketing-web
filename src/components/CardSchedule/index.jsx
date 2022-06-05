import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import Ebu from "../../assets/image/ebu.png";
import Cine21 from "../../assets/image/cine.png";
import hiflix from "../../assets/image/hit.png";
import "./index.css";

class CardSchedule extends Component {
  handleSetUpdate = () => {
    this.props.handleUpdate(1);
  };
  handleDelete = () => {
    this.props.handleDelete();
  };
  render() {
    const { id, movieId, premiere, price, location, time } = this.props.data;
    console.log(time);
    console.log(premiere);
    return (
      <>
        <div class="card h-100">
          <div class="title__ticket">
            <div class="row">
              <div class="col-sm-4">
                <img
                  src={
                    premiere === "Ebu.id"
                      ? Ebu
                      : premiere === "CineOne21"
                      ? Cine21
                      : hiflix
                  }
                  className="image-ticket"
                />
              </div>
              <div class="ticket-title col-sm-8">
                <h4>{premiere}</h4>
                <p class="font__ticket">{location}</p>
              </div>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            {time.map((item) => (
              <a href="#" className="time-font">
                {item}
              </a>
            ))}
          </div>
          <div class="price">
            <div class="row">
              <div class="col-sm-6">
                <h4>Price</h4>
              </div>
              <div class="col-sm-6">
                <h4>{price}</h4>
              </div>
            </div>
          </div>
          <div class="button">
            <button
              type="button"
              class="button__book btn btn-primary"
              onClick={() => this.props.setUpdate(this.props.data)}
            >
              UPDATE
            </button>
            <button
              type="button"
              class="button__delete btn btn-danger"
              onClick={() => this.props.handleDelete(this.props.data)}
            >
              DELETE
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default CardSchedule;
