import { FAVORITES } from "../config/constants";
const initialState = {
  favorites: [],
  isLoading: false,
  error: false
};

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case `${FAVORITES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${FAVORITES}_FULFILLED`:
      return {
        ...state,
        favorites: action.payload.data,
        isLoading: false
      };
    case `${FAVORITES}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
