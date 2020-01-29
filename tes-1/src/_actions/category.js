import { GET_CATEGORY } from "../config/constants";
import axios from "axios";

export const getCategory = category_id => {
  //   const { match } = this.props;
  return {
    type: GET_CATEGORY,
    payload: axios({
      method: "get",
      url: `https://dumtick-app.herokuapp.com/api/v1/category/${category_id}/events`
    })
  };
};
