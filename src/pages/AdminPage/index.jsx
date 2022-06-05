import React, { useState, useEffect } from "react";
import "./index.css";
import "react-bootstrap";
import NavPor from "../../components/NavPor";
import Footer from "../../components/Footer";
import axios from "../../utils/axios";
import Pagination from "react-paginate";
import { Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

const AdminPage = () => {
  // Data Dashboard
  const [dataDashboard, setDataDashboard] = useState([]);
  // const [movieId, setMovieId] = useState("");
  // const [location, setLocation] = useState("");
  // const [premiere, setPremiere] = useState("");
  const [dataFilter, setDataFIlter] = useState({
    movieId: "",
    location: "",
    premiere: "",
  });

  const getDataDashboard = async () => {
    try {
      const result = await axios.get(
        `/booking/dashboard?movieId=${dataFilter.movieId}&location=${dataFilter.location}&premiere=${dataFilter.premiere}`
      );
      setDataDashboard(result.data.data);
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };
  // Data Movie
  const [dataMovie, setDataMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const getDataMovie = async () => {
    try {
      const result = await axios.get(
        `movie?search=${search}&sort=${sort}&order=desc&page=${page}&limit=${limit}`
      );
      setDataMovie(result.data.data);
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Handle Filter
  const changeText = (event) => {
    setDataFIlter({
      ...dataFilter,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilter = () => {
    getDataDashboard(dataFilter);
  };

  // Hanlde Reset
  const [resetData, setResetData] = useState(false);

  const handleReset = () => {
    setDataFIlter({
      movieId: "",
      location: "",
      premiere: "",
    });
    setDataDashboard([]);
    setResetData(true);
  };

  // useEffect
  useEffect(() => {
    getDataDashboard();
    getDataMovie();
  }, []);

  // console.log(dataDashboard);
  // console.log(dataMovie);
  console.log(dataFilter);

  let setDataTotal = [];
  let setDataMonth = [];
  const dataMovieSales = dataDashboard.map((value) => {
    const month = value.month;
    const total = value.total;
    const setNewDataMonth = month;
    const setNewDataTotal = total;
    setDataTotal.push(setNewDataTotal);
    setDataMonth.push(setNewDataMonth);
  });
  // console.log(dataMovieSales, "Data Sales");

  const data = {
    labels: setDataMonth,
    datasets: [
      {
        label: "Movie Sales",
        backgroundColor: "#5F2EEA",
        borderColor: "#5F2EEA",
        data: setDataTotal,
      },
    ],
  };

  return (
    <>
      <NavPor></NavPor>
      <main>
        <div class="content">
          <div class="row">
            <div class="col-md-8">
              <h3>DASHBOARD</h3>
              <div class="movie__title">
                <div class="row">
                  <div class="col-sm-6">
                    <Line data={data} />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <h3>Order Info</h3>
              <div class="content__order">
                <select
                  id="inputState"
                  class="form-select"
                  name="movieId"
                  onChange={changeText}
                  value={dataFilter.movieId}
                >
                  <option selected>Select Movie</option>
                  {dataMovie.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <br />
                <select
                  id="inputState"
                  class="form-select"
                  name="premiere"
                  onChange={changeText}
                  value={dataFilter.premiere}
                >
                  <option selected>Select Priemere</option>
                  <option value="Ebu.id">Ebu.id</option>
                  <option value="CineOne21">CineOne21</option>
                  <option value="hiflix">hiflix</option>
                </select>
                <br />
                <select
                  id="inputState"
                  class="form-select"
                  name="location"
                  onChange={changeText}
                  value={dataFilter.location}
                >
                  <option selected>Select Location</option>
                  <option value="Bogor">Bogor</option>
                  <option value="Depok">Depok</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Bekasi">Bekasi</option>
                </select>
                <br />
                <button
                  type="submit"
                  class="filter-button btn btn-primary"
                  onClick={handleFilter}
                >
                  filter Change
                </button>
                <br />
                <br />
                <button
                  type="submit"
                  class="reset-button btn btn-primary"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default AdminPage;
