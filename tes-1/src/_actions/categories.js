import { GET_CATEGORIES } from "../config/constants";
import axios from "axios";

export const getCategories = () => {
  return {
    type: GET_CATEGORIES,
    payload: axios({
      method: "get",
      url: "https://dumtick-app.herokuapp.com/api/v1/categories"
    })
  };
};
