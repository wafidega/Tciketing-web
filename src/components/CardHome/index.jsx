import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./index.css";

class CardMovie extends Component {
  handleSetUpdate = () => {
    this.props.handleUpdate(1);
  };
  render() {
    const { id, name, category, image } = this.props.data;
    return (
      <>
        <Card className="card__img--size">
          <Card.Img
            variant="top"
            src={`http://localhost:3001/upload/movie/${image}`}
          />
          <Card.Body>
            <h2>{name}</h2>
            <h6>{category}</h6>
            <div className="btn__design">
              {/* <Button variant="light" onClick={() => this.props.handleDetail(id)}>
                Details
              </Button> */}
              <Button
                variant="primary"
                onClick={() => this.props.handleDetail(id)}
              >
                Book now
              </Button>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default CardMovie;
