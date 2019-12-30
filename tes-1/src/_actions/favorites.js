import { FAVORITES } from "../config/constants";
import axios from "axios";

export const getFavorites = () => {
  const token = localStorage.getItem("token");
  return {
    type: FAVORITES,
    payload: axios({
      method: "get",
      url: `http://localhost:5000/api/v1/user/favorites`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};
