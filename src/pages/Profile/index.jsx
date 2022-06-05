import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import "react-bootstrap";
import NavPor from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProPic from "../../assets/image/xiao.png";
import axios from "../../utils/axios";
import { getDataUser } from "../../stores/actions/dataUser";
import { connect } from "react-redux";
import Pagination from "react-paginate";
import CardMovie from "../../components/Card";
import { toast, ToastContainer } from "react-toastify";

const Profile = (props) => {
  // get data
  const [dataProfile, setDataProfile] = useState([]);
  // update profile
  const [updateProfile, setUpdateProfile] = useState({
    first_name: "",
    last_name: "",
  });
  // update password
  const [updatePassword, setUpdatePassword] = useState({
    password: "",
    confirm_password: "",
  });
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
      setUpdateProfile({
        first_name: result.data.data[0].first_name,
        last_name: result.data.data[0].last_name,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getDataProfile(user);
    console.log(user);
  }, [user]);

  // Update Profile
  const handleUpdateProfile = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.patch(
        `/user/update_profile/${user}`,
        updateProfile
      );
      toast.success("Sucess Update Profile");
      getDataProfile(user);
    } catch (error) {
      toast.warn(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };
  const handleProfile = (event) => {
    setUpdateProfile({
      ...updateProfile,
      [event.target.name]: event.target.value,
    });
  };

  // Update Password
  const handleUpdatePassword = async (event) => {
    try {
      event.preventDefault();
      const resultUpdatePassword = await axios.patch(
        `/user/update_password/${user}`,
        updatePassword
      );
      toast.success("Sucess Update Password");
      console.log(resultUpdatePassword);
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };
  const handlePassword = (event) => {
    setUpdatePassword({
      ...updatePassword,
      [event.target.name]: event.target.value,
    });
  };
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
      getDataProfile(user);
    } catch (error) {
      console.log(error);
      toast.warn("Update Gagal");
    }
  };
  const handleImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setUpdateImage(event.target.files[0]);
  };
  // Reset
  const handleReset = (event) => {
    event.preventDefault();
    // console.log("Reset Form");
  };

  console.log(dataProfile);
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
                <h6>Detail information</h6>
                <hr />
                <br />
                {/* <!-- form update --> */}
                <ToastContainer />
                <form class="row g-3" onSubmit={handleUpdateProfile}>
                  <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="first_name"
                      name="first_name"
                      onChange={handleProfile}
                      value={updateProfile.first_name}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="last_name"
                      name="last_name"
                      onChange={handleProfile}
                      value={updateProfile.last_name}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      value={dataProfile.email}
                      // onChange={handleProfile}
                      disabled
                    />
                  </div>
                  {/* <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">
                      Phone Number
                    </label>
                    <div class="input-group mb-2 mr-sm-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">+62</div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        id="inlineFormInputGroupUsername2"
                        placeholder="Number"
                      />
                    </div>
                  </div> */}
                  <div class="col-12">
                    <button type="submit" class="update-button btn btn-primary">
                      Update Change
                    </button>
                  </div>
                </form>
                {/* <!-- Form Update -->
          <!-- Form Privacy --> */}
                <br />
                <h6>Change Password</h6>
                <hr />
                <br />
                <form class="row g-3">
                  <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">
                      new password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                      onChange={handlePassword}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="confirm_password"
                      name="confirm_password"
                      onChange={handlePassword}
                    />
                  </div>
                  <div class="col-12">
                    <button
                      type="submit"
                      class="update-button btn btn-primary"
                      onClick={handleUpdatePassword}
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  getDataUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
