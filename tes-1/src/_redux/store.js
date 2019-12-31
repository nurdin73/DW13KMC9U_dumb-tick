import { createStore, combineReducers, applyMiddleware } from "redux";

import { categories } from "../_reducers/categories";
import { events, ongoing } from "../_reducers/events";
import { category } from "../_reducers/category";
import { event } from "../_reducers/event";
import { signUp, login, profile } from "../_reducers/user";
import { favorites } from "../_reducers/favorites";
import { promise, logger } from "./middleware";

const rootReducers = combineReducers({
  categories,
  events,
  category,
  event,
  signUp,
  login,
  profile,
  favorites,
  ongoing
});
const store = createStore(rootReducers, applyMiddleware(promise, logger));

export default store;
