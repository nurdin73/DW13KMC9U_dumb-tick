import { GET_EVENTS, GET_EVENTS_ON_GOING } from "../config/constants";
import axios from "axios";
const date = new Date();
let bln = date.getMonth() + 1;
if (bln < 10) {
  bln = "0" + bln;
} else {
  // eslint-disable-next-line no-self-assign
  bln = bln;
}
let hari = date.getDate();
if (hari < 10) {
  hari = "0" + hari;
} else {
  // eslint-disable-next-line no-self-assign
  hari = hari;
}
let tgl = date.getFullYear() + "-" + bln + "-" + hari;
const dateEnd = new Date();
dateEnd.setDate(dateEnd.getDate() + 1);
dateEnd.setMonth(dateEnd.getMonth());
let endBln = dateEnd.getMonth() + 1;
if (endBln < 10) {
  endBln = "0" + endBln;
} else {
  // eslint-disable-next-line no-self-assign
  endBln = endBln;
}
let hari1 = dateEnd.getDate();
if (hari1 < 10) {
  hari1 = "0" + hari1;
} else {
  // eslint-disable-next-line no-self-assign
  hari1 = hari1;
}
let endTgl = dateEnd.getFullYear() + "-" + endBln + "-" + hari1;

let dateOngoing = new Date();
dateOngoing.setDate(dateOngoing.getDate() + 5);
dateOngoing.setMonth(dateOngoing.getMonth());
let blnOngoing = dateOngoing.getMonth() + 1;
if (blnOngoing < 10) {
  blnOngoing = "0" + blnOngoing;
} else {
  // eslint-disable-next-line no-self-assign
  blnOngoing = blnOngoing;
}

let hariOngoing = dateOngoing.getDate();
if (hariOngoing < 10) {
  hariOngoing = "0" + hariOngoing;
} else {
  // eslint-disable-next-line no-self-assign
  hariOngoing = hariOngoing;
}
let onGoing = dateOngoing.getFullYear() + "-" + blnOngoing + "-" + hariOngoing;

export const getEvents = () => {
  return {
    type: GET_EVENTS,
    payload: axios({
      method: "get",
      url: `http://localhost:5000/api/v1/events?start_time=${tgl}&end_time=${endTgl}`
    })
  };
};

export const getEventOngoing = () => {
  return {
    type: GET_EVENTS_ON_GOING,
    payload: axios({
      method: "get",
      url: `http://localhost:5000/api/v1/ongoing?startTime=${onGoing}`
    })
  };
};
