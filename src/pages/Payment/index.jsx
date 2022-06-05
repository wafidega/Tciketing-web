import React, { useState, useEffect } from "react";
import "./index.css";
import "react-bootstrap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "../../utils/axios";
import Bca from "../../assets/image/bca.png";
import GoPay from "../../assets/image/gopay.png";
import Bri from "../../assets/image/bri.png";
import Paypal from "../../assets/image/paypal.png";
import Dana from "../../assets/image/dana.png";
import Visa from "../../assets/image/visa.png";
import Ovo from "../../assets/image/ovo.png";
import Google from "../../assets/image/google.png";
import qs from "query-string";

const Payment = (props) => {
  // Take data from order
  const dataOrder = props.history.location.state.setPayment;
  console.log(dataOrder);
  // Get data
  const [dataMovie, setDataMovie] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
  const [dataProfile, setDataProfile] = useState([]);
  const getDataMovieById = () => {
    axios
      .get(`movie/${dataOrder.movieId}`)
      .then((res) => {
        console.log(res);
        setDataMovie(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const getScheduleById = () => {
    axios
      .get(`schedule/${dataOrder.scheduleId}`)
      .then((res) => {
        console.log(res);
        setDataSchedule(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const getDataProfile = async () => {
    try {
      const result = await axios.get(`/user/user-byid/${dataOrder.userId}`);
      setDataProfile(result.data.data[0]);
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getDataMovieById();
    getScheduleById();
    getDataProfile();
  }, []);
  console.log(dataMovie);
  console.log(dataSchedule);
  console.log(dataProfile);
  // Handle Payment
  const handlePayment = async () => {
    try {
      const dataPayment = {
        userId: dataOrder.userId,
        scheduleId: dataOrder.scheduleId,
        movieId: dataOrder.movieId,
        totalTicket: dataOrder.countSeat,
        dateBooking: dataOrder.dateBooking,
        timeBooking: dataOrder.timeBooking,
        paymentMethod: "Midtrans",
        seat: dataOrder.selectedSeat,
      };
      console.log(dataPayment);
      const result = await axios.post(`/booking`, dataPayment);
      console.log(result);
      console.log(result.data.data.urlRedirect);
      window.open(result.data.data.urlRedirect, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <main>
        <div class="row">
          <div class="col-md-6 payment-content">
            <h3>Payment Info</h3>
            <div class="payment-detail">
              <div class="row">
                <div class="col-sm-6">
                  <div className="payment-list">
                    <p>Date And time</p>
                    <p>Movie title</p>
                    <p>Cinema name</p>
                    <p>Number of tickets</p>
                    <p>Total payment</p>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div className="payment-desc">
                    <p>{dataOrder.dateBooking}</p>
                    <p>{dataMovie.name}</p>
                    <p>{dataSchedule.premiere}</p>
                    <p>{dataOrder.countSeat} pieces</p>
                    <p>Rp. {dataOrder.totalTicket}</p>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="payment-menthod-title">Available Payment</h3>
            <div class="payment-method">
              <div class="first__line">
                {/* <button
                  type="button"
                  class="btn btn-outline-primary button-payment"
                  value="GooglrPay"
                >
                  <img
                    src={Google}
                    alt=""
                    class="image-payment"
                    alt="GooglePay"
                  />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary button-payment"
                >
                  <img src={Visa} alt="" class="image-payment" alt="Visa" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary button-payment"
                >
                  <img src={GoPay} alt="" class="image-payment" alt="GoPay" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary button-payment"
                >
                  <img src={Paypal} alt="" class="image-payment" alt="Paypal" />
                </button> */}
                <img src={Google} alt="" class="image-payment" />
                <img src={Visa} alt="" class="image-payment" />
                <img src={GoPay} alt="" class="image-payment" />
                <img src={Paypal} alt="" class="image-payment" />
              </div>
              <br />
              <div class="second__line">
                {/* <button
                  type="button"
                  class="btn btn-outline-primary button-payment"
                >
                  <img src={Dana} alt="" class="image-payment" alt="Dana" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary button-payment"
                >
                  <img src={Bca} alt="" class="image-payment" alt="Bca" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary button-payment"
                >
                  <img src={Bri} alt="" class="image-payment" alt="Bri" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary button-payment"
                >
                  <img src={Ovo} alt="" class="image-payment" alt="Ovo" />
                </button> */}
                <img src={Dana} alt="" class="image-payment" />
                <img src={Bca} alt="" class="image-payment" />
                <img src={Bri} alt="" class="image-payment" />
                <img src={Ovo} alt="" class="image-payment" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <h3>Personal Info</h3>
            <div class="data">
              <form>
                <div class="form-group">
                  <p>Full Name</p>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name *"
                    value={dataProfile.first_name}
                    disabled
                  />
                </div>
                <br />
                <div class="form-group">
                  <p>Email</p>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    value={dataProfile.email}
                    disabled
                  />
                </div>
                <br />
              </form>
              <button
                className="btn btn-danger payment-pay"
                onClick={handlePayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Payment;
