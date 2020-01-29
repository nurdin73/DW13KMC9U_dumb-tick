import { FAVORITES } from "../config/constants";
import axios from "axios";

export const getFavorites = () => {
  const token = localStorage.getItem("token");
  return {
    type: FAVORITES,
    payload: axios({
      method: "get",
      url: `https://dumtick-app.herokuapp.com/api/v1/user/favorites`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};
