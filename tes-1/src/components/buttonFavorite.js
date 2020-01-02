import React, { Component } from "react";
import { Favorite } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import Axios from "axios";

class ButtonFav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: [],
      success: false
    };
  }

  handleFavorite = id => event => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    Axios({
      method: "post",
      url: "http://localhost:5000/api/v1/favorite",
      data: {
        event_id: id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.data.status === false) {
        alert(res.data.message);
      } else {
        window.location.href = "http://localhost:3000/";
      }
    });
  };
  handleCancelFavorite = id => event => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    Axios({
      method: "delete",
      url: "http://localhost:5000/api/v1/favorite",
      data: {
        event_id: id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.data.status === false) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
        window.location.href = "http://localhost:3000/";
      }
    });
  };
  componentDidMount() {
    const token = localStorage.getItem("token");

    Axios({
      method: "get",
      url: "http://localhost:5000/api/v1/user/favorite",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.data.length === 0) {
        this.setState({ success: false });
      } else {
        this.setState({ fav: res.data, success: true });
      }
    });
  }
  render() {
    if (this.state.success === false) {
      return (
        <IconButton
          onClick={this.handleFavorite(this.props.event_id)}
          onDoubleClick={this.handleCancelFavorite(this.props.event_id)}
        >
          <Favorite />
        </IconButton>
      );
    } else {
      const found = this.state.fav.find(fav => {
        return fav.event_id === this.props.event_id;
      });
      if (found) {
        return (
          <IconButton
            onDoubleClick={this.handleCancelFavorite(this.props.event_id)}
          >
            <Favorite color="error" />
          </IconButton>
        );
      } else {
        return (
          <IconButton onClick={this.handleFavorite(this.props.event_id)}>
            <Favorite />
          </IconButton>
        );
      }
    }
  }
}

export default ButtonFav;
