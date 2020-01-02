import {PAYMENTS} from '../config/constants';
const initialState = {
  payments: [],
  isLoading: false,
  error: false,
};

export const payments = (state = initialState, action) => {
  switch (action.type) {
    case `${PAYMENTS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${PAYMENTS}_FULFILLED`:
      return {
        ...state,
        payments: action.payload.data,
        isLoading: false,
      };
    case `${PAYMENTS}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
