import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Category from "./Pages/Page-Category";
import Event from "./Pages/Event";
import Header from "./components/Header";
import HeaderLogin from "./components/HeaderLogin";
import React, { Component } from "react";
import Profile from "./Pages/Profile";
import MyTicket from "./Pages/my-ticket";
import Payment from "./Pages/payment";
import AddEvent from "./Pages/add-event";
import EditProfile from "./Pages/editProfile";
export default class App extends Component {
  render() {
    if (localStorage.getItem("token") != null) {
      return (
        <Router>
          <div
            style={{
              backgroundColor: "rgb(239, 198, 198)",
              minHeight: "100vh"
            }}
          >
            <HeaderLogin />
            <Switch>
              <Route path="/edit-profile">
                <EditProfile />
              </Route>
              <Route path="/payment">
                <Payment />
              </Route>
              <Route path="/add-event">
                <AddEvent />
              </Route>
              <Route path="/my-ticket">
                <MyTicket />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/event/:id">
                <Event />
              </Route>
              <Route path="/category/:id/events">
                <Category />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      );
      function Logout() {
        localStorage.clear("token");
        window.location.href = "http://localhost:3000";
      }
    } else {
      return (
        <Router>
          <div
            style={{
              backgroundColor: "rgb(239, 198, 198)",
              minHeight: "100vh"
            }}
          >
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
