import axios from "../../utils/axios";

export const getDataUser = (id) => {
  return {
    type: "GETDATAUSER",
    payload: axios.get(`/user/user-byid/${id}`),
  };
};
