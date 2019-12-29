import { REGISTER, LOGIN } from "../config/constants";
const initialState = {
  register: [],
  login: [],
  isLoading: false,
  error: false
};

export const register = (state = initialState, action) => {
  switch (action.type) {
    case `${REGISTER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${REGISTER}_FULFILLED`:
      return {
        ...state,
        register: action.payload.data,
        isLoading: false
      };
    case `${REGISTER}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        login: action.payload.data,
        isLoading: false
      };
    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
