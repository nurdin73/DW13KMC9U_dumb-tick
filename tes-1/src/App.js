import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Category from "./Pages/Page-Category";
import Event from "./Pages/Event";
export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/events?title=">
            <h1>asdasdasd</h1>
          </Route>
          <Route path="/event/:id">
            <Event />
          </Route>
          <Route path="/category/:id/events">
            <Category />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
