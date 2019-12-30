import { GET_EVENTS } from "../config/constants";
import axios from "axios";
const date = new Date();
let bln = date.getMonth() + 1;
let tgl = date.getFullYear() + "-" + bln + "-" + date.getDate();
export const getEvents = () => {
  return {
    type: GET_EVENTS,
    payload: axios({
      method: "get",
      url: `http://localhost:5000/api/v1/events?start_time=${tgl}`
    })
  };
};
