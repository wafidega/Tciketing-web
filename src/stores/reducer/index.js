import { combineReducers } from "redux";

import auth from "./auth";
import movie from "./movie";
import getDataUser from "./dataUser";

export default combineReducers({
  auth,
  movie,
  getDataUser,
});
