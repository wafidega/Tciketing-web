import React, { useState, useEffect } from "react";
import "./index.css";
import "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import NavPor from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProPic from "../../assets/image/profile.png";
import axios from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";

const ProfileOrder = (props) => {
  // get data
  const [dataProfile, setDataProfile] = useState([]);
  // update image
  const [image, setImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  //  Implement Redux
  const user = localStorage.getItem("id");
  console.log(user);
  // get Profile
  const getDataProfile = async (id) => {
    try {
      const result = await axios.get(`/user/user-byid/${id}`);
      setDataProfile(result.data.data[0]);
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getDataProfile(user);
    getDataBookingByUser();
    console.log(user);
  }, [user]);
  // Update Image
  const handleUpdateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", updateImage);
      const resultImageUpdate = await axios.patch(
        `/user/update-image/${user}`,
        formData
      );
      console.log(formData);
      toast.success("Sucess Update Image");
      getDataProfile();
      console.log(resultImageUpdate);
    } catch (error) {
      console.log(error);
      toast.warn("Update Gagal");
    }
  };
  const handleImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setUpdateImage(event.target.files[0]);
  };
  // get Boooking by user id
  const [dataBookingByUser, setDataBookingByUser] = useState([]);
  const getDataBookingByUser = async () => {
    try {
      const result = await axios.get(`/booking/user-id/${user}`);
      setDataBookingByUser(result.data.data);
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Handle Ticket
  const handleTicket = (data) => {
    console.log(data);
    props.history.push("/ticket", data);
  };

  // Handle Status
  const handleChangeStatus = async (id) => {
    try {
      console.log(id);
      const result = await axios.get(`/booking/booking-status/${id}`);
      console.log(result);
      toast.success("Ticket is Active");
      getDataBookingByUser();
    } catch (error) {
      toast.error("Ticket is used");
    }
  };

  return (
    <>
      <NavPor></NavPor>
      <main>
        <div class="row">
          {/* <!-- left --> */}
          <div class="col-md-4">
            <div class="profile-left">
              <h4>INFO</h4>
              <center>
                <img
                  src={
                    dataProfile?.image
                      ? `http://localhost:3001/upload/user/${dataProfile?.image}`
                      : `${ProPic}`
                  }
                  alt=""
                  className="image-profile"
                />
                <input
                  type="file"
                  name="image"
                  class="form-control"
                  style={{ margin: 20 }}
                  onChange={handleImage}
                />
                <button
                  type="submit"
                  class="update-button btn btn-primary"
                  style={{ margin: 20 }}
                  onClick={handleUpdateImage}
                >
                  Update Image
                </button>
                <h5>{dataProfile.first_name}</h5>
                <h6>{dataProfile.last_name}</h6>
              </center>
              <hr />
              <h6>Loyalty Points</h6>
              <div class="movie-point">
                <center>
                  <image src="assets/image/movieblock.png" alt="" />
                  <h6>180 points become a master</h6>
                </center>
              </div>
            </div>
          </div>
          {/* <!-- Left-end --> */}
          <div class="col-md-8">
            <ToastContainer />
            <div class="profile-right">
              <div class="movie-link">
                <a href="/profile" class="account btn btn-primary">
                  Profile <hr class="account-hr" />
                </a>
                <a href="/profile-order" class="order btn btn-primary">
                  Order
                  <hr class="order-hr" />
                </a>
              </div>
              <div class="content-form">
                <h6>My Ticket</h6>
                <hr />
                <br />
                {/* <!-- Ticket --> */}
                {dataBookingByUser.map((item) => (
                  <div class="ticket-book">
                    <h6>
                      {new Date(item.dateBooking).toISOString().split("T")[0]}
                    </h6>
                    <br />
                    <div class="row">
                      <div class="col-md-6">
                        <h5>{item.name}</h5>
                      </div>
                      <div class="col-md-6">
                        <img src="assets/image/cine.png" alt="" />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-md-6">
                        {item.bookingStatus === "Active" ? (
                          <button
                            type="submit"
                            class="button-inactive btn btn-primary"
                            onClick={() => handleChangeStatus(item.id)}
                          >
                            Ticket Used
                          </button>
                        ) : (
                          <button
                            type="submit"
                            class="button-active btn btn-primary"
                            onClick={() => handleChangeStatus(item.id)}
                          >
                            Active a Ticket
                          </button>
                        )}
                      </div>
                      <div class="col-md-6">
                        <button
                          onClick={() => handleTicket(item.id)}
                          className="button-showDetail btn btn-light"
                        >
                          Show Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <!-- Ticket active --> */}
                <br />
                <br />
                {/* <!-- Ticket InActive --> */}
                {/* <div class="inactive">
                  <h6>Tuesday, 07 July 2020 - 04:30pm</h6>
                  <br />
                  <div class="row">
                    <div class="col-md-6">
                      <h5>Spider-Man Homecoming</h5>
                    </div>
                    <div class="col-md-6">
                      <img src="assets/image/cine.png" alt="" />
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-md-6">
                      <button
                        type="submit"
                        class="button-inactive btn btn-primary"
                      >
                        Ticket Used
                      </button>
                    </div>
                    <div class="col-md-6">
                      <a href="#"> Show detail</a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default ProfileOrder;
