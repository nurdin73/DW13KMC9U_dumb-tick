import { GET_CATEGORY } from "../config/constants";
import axios from "axios";

export const getCategory = category_id => {
  //   const { match } = this.props;
  return {
    type: GET_CATEGORY,
    payload: axios({
      method: "get",
      url: `http://localhost:5000/api/v1/category/${category_id}/events`
    })
  };
};
