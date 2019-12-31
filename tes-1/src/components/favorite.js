import React, { Component } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getFavorites } from "../_actions/favorites";
import { getProfile } from "../_actions/user";
import { connect } from "react-redux";

class Favorites extends Component {
  componentDidMount() {
    this.props.getFavorites();
    this.props.getProfile();
  }
  render() {
    const { favorites } = this.props.favorites;
    if (favorites.length === 0) {
      return (
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#f50057",
            padding: "10px",
            borderRadius: "5px",
            color: "#fff",
            marginTop: "20px"
          }}
        >
          <Typography variant="body1">No Favorite Events</Typography>
        </div>
      );
    }
    return (
      <div>
        <Typography
          variant="h4"
          component="p"
          color="secondary"
          style={{ marginTop: "30px", fontWeight: "bold" }}
        >
          Favorites
        </Typography>
        <Grid container spacing={4} style={{ marginTop: "10px" }}>
          {favorites.map((favorite, i) => {
            return (
              <Grid item md={4} xs={6} key={i}>
                <Card>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        padding: "5px",
                        backgroundColor: "#fff",
                        color: "#000",
                        fontWeight: 500
                      }}
                    >
                      {favorite.price}
                    </div>
                    <CardMedia
                      component="img"
                      alt={favorite.title}
                      height="140"
                      image={favorite.image}
                      title={favorites.title}
                    />
                  </div>
                  <CardContent>
                    <Link
                      to={"/event/" + favorite.id}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        gutterBottom
                        color="inherit"
                        variant="h5"
                        component="h2"
                      >
                        {favorite.title}
                      </Typography>
                    </Link>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {favorite.description.slice(0, 200) + "..."}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    favorites: state.favorites
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFavorites: () => {
      dispatch(getFavorites());
    },
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
