import { createStore, combineReducers, applyMiddleware } from "redux";

import { categories } from "../_reducers/categories";
import { events } from "../_reducers/events";
import { category } from "../_reducers/category";
import { event } from "../_reducers/event";

import { promise, logger } from "./middleware";

const rootReducers = combineReducers({
  categories,
  events,
  category,
  event
});
const store = createStore(rootReducers, applyMiddleware(promise, logger));

export default store;
