import { GET_CATEGORY } from "../config/constants";
const initialState = {
  category: [],
  isLoading: false,
  error: false
};

export const category = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_CATEGORY}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_CATEGORY}_FULFILLED`:
      return {
        ...state,
        category: action.payload.data,
        isLoading: false
      };
    case `${GET_CATEGORY}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
