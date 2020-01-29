import {REGISTER, LOGIN, PROFILE, UPDATE_PROFILE} from '../config/constants';
import axios from 'axios';

export const setUsers = data => {
  //   const { match } = this.props;
  return {
    type: REGISTER,
    payload: axios ({
      method: 'post',
      url: `https://dumtick-app.herokuapp.com/api/v1/register`,
      data: data,
    }),
  };
};

export const setLogin = data => {
  return {
    type: LOGIN,
    payload: axios ({
      method: 'post',
      url: `https://dumtick-app.herokuapp.com/api/v1/login`,
      data: data,
    }),
  };
};

export const getProfile = () => {
  const token = localStorage.getItem ('token');
  return {
    type: PROFILE,
    payload: axios ({
      method: 'get',
      url: `https://dumtick-app.herokuapp.com/api/v1/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  };
};

export const setProfile = values => {
  const token = localStorage.getItem ('token');

  return {
    type: UPDATE_PROFILE,
    payload: axios ({
      method: 'patch',
      url: `https://dumtick-app.herokuapp.com/api/v1/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: values,
    }),
  };
};
