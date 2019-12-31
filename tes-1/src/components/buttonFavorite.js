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
    event.preventDefault();
    Axios({
      method: "post",
      url: ""
    });
    alert(id);
  };
  handleCancelFavorite = id => event => {
    event.preventDefault();
    alert(id);
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
      console.log(found);
      if (found) {
        return (
          <IconButton
            onClick={this.handleFavorite(this.props.event_id)}
            onDoubleClick={this.handleCancelFavorite(this.props.event_id)}
          >
            <Favorite color="error" />
          </IconButton>
        );
      } else {
        return (
          <IconButton
            onClick={this.handleFavorite(this.props.event_id)}
            onDoubleClick={this.handleCancelFavorite(this.props.event_id)}
          >
            <Favorite />
          </IconButton>
        );
      }
    }
  }
}

export default ButtonFav;
