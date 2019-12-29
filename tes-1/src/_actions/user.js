import { REGISTER, LOGIN } from "../config/constants";
import axios from "axios";

export const setUsers = data => {
  //   const { match } = this.props;
  return {
    type: REGISTER,
    payload: axios({
      method: "post",
      url: `http://localhost:5000/api/v1/register`,
      data: data
    })
  };
};

export const setLog = (username, password) => {
  return {
    type: LOGIN,
    payload: axios({
      method: "post",
      url: `http://localhost:5000/api/v1/login`,
      data: {
        username: username,
        password: password
      }
    })
  };
};
