import { GET_EVENT, ADD_EVENT } from "../config/constants";
import axios from "axios";

export const getEvent = event_id => {
  //   const { match } = this.props;
  return {
    type: GET_EVENT,
    payload: axios({
      method: "get",
      url: `http://localhost:5000/api/v1/event/${event_id}`
    })
  };
};

export const addEvent = data => {
  //   const { match } = this.props;
  const token = localStorage.getItem("token");
  return {
    type: ADD_EVENT,
    payload: axios({
      method: "post",
      url: `http://localhost:5000/api/v1/event`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};
