import { GET_EVENT, ADD_EVENT } from "../config/constants";
const initialState = {
  event: [],
  addEvent: [],
  isLoading: false,
  error: false
};

export const event = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_EVENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EVENT}_FULFILLED`:
      return {
        ...state,
        event: action.payload.data,
        isLoading: false
      };
    case `${GET_EVENT}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};

export const addEvent = (state = initialState, action) => {
  switch (action.type) {
    case `${ADD_EVENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_EVENT}_FULFILLED`:
      return {
        ...state,
        addEvent: action.payload.data,
        isLoading: false
      };
    case `${ADD_EVENT}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
