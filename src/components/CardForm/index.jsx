import React, { Component } from "react";
import "react-bootstrap";
import Widow from "../../assets/image/widow.png";
import "./index.css";
import qs from "query-string";
import axios from "../../utils/axios";

class CardMovieForm extends Component {
  setUpdate = () => {
    this.props.setUpdate(1);
  };
  handleDelete = () => {
    this.props.handleDelete();
  };
  render() {
    const {
      id,
      name,
      genre,
      director,
      duration,
      cast,
      synopsis,
      releaseDate,
      image,
    } = this.props.data;
    // const { dataUser } = this.state;
    // console.log(this.state.dataUser);
    return (
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
          Detail
        </button>
        <button
          type="button"
          class="button__upcoming btn btn-primary"
          onClick={() => this.props.setUpdate(this.props.data)}
        >
          Update
        </button>
        <button
          type="button"
          class="button__delete btn btn-danger"
          onClick={() => this.props.handleDelete(this.props.data)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default CardMovieForm;
