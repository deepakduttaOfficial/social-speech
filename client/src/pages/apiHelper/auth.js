import axios from "axios";
import { REACT_APP_API_KEY } from "../../backend";

export const signin = (data) => {
  axios.defaults.withCredentials = true;

  return axios
    .post(`${REACT_APP_API_KEY}/signin`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
  // axios({
  //   method: 'get',
  //   url: `${REACT_APP_API_KEY}/signin`,
  //   responseType: 'stream'
  // })
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
  next();
};

export const isAuthenticate = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
