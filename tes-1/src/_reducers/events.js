import { GET_EVENTS, GET_EVENTS_ON_GOING } from "../config/constants";
const initialState = {
  events: [],
  onGoing: [],
  addPayment: [],
  isLoading: false,
  error: false
};

export const events = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_EVENTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EVENTS}_FULFILLED`:
      return {
        ...state,
        events: action.payload.data,
        isLoading: false
      };
    case `${GET_EVENTS}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};

export const ongoing = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_EVENTS_ON_GOING}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EVENTS_ON_GOING}_FULFILLED`:
      return {
        ...state,
        onGoing: action.payload.data,
        isLoading: false
      };
    case `${GET_EVENTS_ON_GOING}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
