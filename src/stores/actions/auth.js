import axios from "../../utils/axios";

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: axios.post("auth/login", data),
  };
};

export const register = (data) => {
  return {
    type: "REGISTER",
    payload: axios.post("auth/register", data),
  };
};
