import { GET_EVENT } from "../config/constants";
const initialState = {
  event: [],
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
