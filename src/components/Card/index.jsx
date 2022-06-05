import React, { Component } from "react";
import "react-bootstrap";
import "./index.css";
import Widow from "../../assets/image/widow.png";

class CardMovie extends Component {
  render() {
    const { id, name, image } = this.props.data;
    return (
      <div className="upcoming__image">
        <div className="card-group">
          <div className="card">
            <img
              src={`http://localhost:3001/upload/movie/${image}`}
              alt=""
              className="comic__image mx-auto"
            />
            <div class="card-body">
              <h5 class="card-title">{name}</h5>
            </div>
            <button
              type="button"
              class="button__upcoming btn btn-primary"
              onClick={() => this.props.handleDetail(id)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CardMovie;
