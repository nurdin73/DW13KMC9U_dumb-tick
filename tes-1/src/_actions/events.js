import { GET_EVENTS } from "../config/constants";
import axios from "axios";

export const getEvents = () => {
  return {
    type: GET_EVENTS,
    payload: axios({
      method: "get",
      url: "http://localhost:5000/api/v1/eventAll"
    })
  };
};
