import axios from "axios";
import { REACT_APP_API_KEY } from "../../backend";

export const getPosts = () => {
  return axios
    .get(`${REACT_APP_API_KEY}/userpost/getall`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
