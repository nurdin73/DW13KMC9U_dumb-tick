import { PAYMENTS, GET_PAYMENT } from "../config/constants";
import axios from "axios";

export const getTicket = () => {
  const token = localStorage.getItem("token");
  return {
    type: PAYMENTS,
    payload: axios({
      method: "get",
      url: `http://localhost:5000/api/v1/order?status=approved`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};

export const getPayment = () => {
  const token = localStorage.getItem("token");
  return {
    type: GET_PAYMENT,
    payload: axios({
      method: "get",
      url: `http://localhost:5000/api/v1/payment`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};
