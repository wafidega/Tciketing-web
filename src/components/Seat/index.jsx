import React, { Component } from "react";
import "./index.css";

class Seat extends Component {
  constructor() {
    super();
    this.state = {
      leftSideSeat: [1, 2, 3, 4, 5, 6, 7],
      rightSideSeat: [8, 9, 10, 11, 12, 13, 14],
    };
  }

  componentDidMount() {
    this.setAlphabhetSeat();
  }

  setAlphabhetSeat = () => {
    const { seatAlphabhet } = this.props;
    const leftSideSeat = this.state.leftSideSeat.map(
      (item) => `${seatAlphabhet}${item}`
    ); // ["A1", "A2", ..., "A7"]
    const rightSideSeat = this.state.rightSideSeat.map(
      (item) => `${seatAlphabhet}${item}`
    );
    this.setState({
      leftSideSeat: leftSideSeat,
      rightSideSeat: rightSideSeat,
    });
  };
  selectedSeat = () => {
    this.props.selectedSeat();
  };

  render() {
    const { leftSideSeat, rightSideSeat } = this.state;
    const { seatAlphabhet, selectedSeat, reserved, selected } = this.props;
    return (
      <div className="seat">
        <div className="row seat__row">
          <div className="col seat__col seat__col--text">{seatAlphabhet}</div>
          {leftSideSeat.map((item, index) => (
            <div className="col seat__col" key={index}>
              <div
                className={`seat__list ${
                  reserved.includes(item)
                    ? "seat__list--sold"
                    : selected.includes(item)
                    ? "seat__list--selected"
                    : "seat__list--available"
                }`}
                // onClick={() => {
                //   reserved.includes(item) ? null : selectedSeat(item);
                // }}
                onClick={() => {
                  // eslint-disable-next-line no-unused-expressions
                  reserved.includes(item) ? null : selectedSeat(item);
                }}
              ></div>
            </div>
          ))}
          <div className="col seat__col"></div>
          {rightSideSeat.map((item, index) => (
            <div className="col seat__col" key={index}>
              <div
                className={`seat__list ${
                  reserved.includes(item)
                    ? "seat__list--sold"
                    : selected.includes(item)
                    ? "seat__list--selected"
                    : "seat__list--available"
                }`}
                // onClick={() => {
                //   reserved.includes(item) ? null : selectedSeat(item);
                // }}
                onClick={() => {
                  // eslint-disable-next-line no-unused-expressions
                  reserved.includes(item) ? null : selectedSeat(item);
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Seat;
