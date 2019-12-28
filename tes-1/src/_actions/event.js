import { GET_EVENT } from "../config/constants";
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
