import { createStore, combineReducers, applyMiddleware } from "redux";

import { categories } from "../_reducers/categories";
import { events, ongoing } from "../_reducers/events";
import { category } from "../_reducers/category";
import { event, addEvent } from "../_reducers/event";
import { signUp, login, profile, update } from "../_reducers/user";
import { favorites } from "../_reducers/favorites";
import { payments, paymentPending, addPayment } from "../_reducers/payments";
import { promise, logger } from "./middleware";

const rootReducers = combineReducers({
  categories,
  events,
  category,
  event,
  addEvent,
  signUp,
  login,
  profile,
  update,
  favorites,
  ongoing,
  payments,
  paymentPending,
  addPayment
});
const store = createStore(rootReducers, applyMiddleware(promise, logger));

export default store;
