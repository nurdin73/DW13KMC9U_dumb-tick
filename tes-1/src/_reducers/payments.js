import { PAYMENTS, GET_PAYMENT, ADD_PAYMENT } from "../config/constants";
const initialState = {
  payments: [],
  paymentPending: [],
  addPayment: [],
  isLoading: false,
  error: false
};

export const payments = (state = initialState, action) => {
  switch (action.type) {
    case `${PAYMENTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${PAYMENTS}_FULFILLED`:
      return {
        ...state,
        payments: action.payload.data,
        isLoading: false
      };
    case `${PAYMENTS}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
export const paymentPending = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_PAYMENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PAYMENT}_FULFILLED`:
      return {
        ...state,
        paymentPending: action.payload.data,
        isLoading: false
      };
    case `${GET_PAYMENT}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
export const addPayment = (state = initialState, action) => {
  switch (action.type) {
    case `${ADD_PAYMENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_PAYMENT}_FULFILLED`:
      return {
        ...state,
        addPayment: action.payload.data,
        isLoading: false
      };
    case `${ADD_PAYMENT}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
