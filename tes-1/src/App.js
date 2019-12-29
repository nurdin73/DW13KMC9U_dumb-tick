import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Category from "./Pages/Page-Category";
import Event from "./Pages/Event";
import Header from "./components/Header";
import HeaderLogin from "./components/HeaderLogin";
import React, { Component } from "react";

export default class App extends Component {
  render() {
    if (localStorage.getItem("token") != null) {
      return (
        <Router>
          <div>
            <HeaderLogin />
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
    } else {
      return (
        <Router>
          <div>
            <Header />
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
  }
}
