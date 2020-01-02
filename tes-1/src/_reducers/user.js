import {REGISTER, LOGIN, PROFILE, UPDATE_PROFILE} from '../config/constants';
const initialState = {
  profile: [],
  signUp: [],
  login: [],
  update: [],
  isLoading: false,
  error: false,
};

export const signUp = (state = initialState, action) => {
  switch (action.type) {
    case `${REGISTER}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${REGISTER}_FULFILLED`:
      return {
        ...state,
        signUp: action.payload.data,
        isLoading: false,
      };
    case `${REGISTER}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false,
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
        isLoading: true,
      };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        login: action.payload.data,
        isLoading: false,
      };
    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case `${PROFILE}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${PROFILE}_FULFILLED`:
      return {
        ...state,
        profile: action.payload.data,
        isLoading: false,
      };
    case `${PROFILE}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const update = (state = initialState, action) => {
  switch (action.type) {
    case `${UPDATE_PROFILE}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${UPDATE_PROFILE}_FULFILLED`:
      return {
        ...state,
        update: action.payload.data,
        isLoading: false,
      };
    case `${UPDATE_PROFILE}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
