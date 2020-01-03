import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategory } from "../_actions/category";
import { withRouter } from "react-router-dom";
import { getProfile } from "../_actions/user";
import { getFavorites } from "../_actions/favorites";

import {
  Typography,
  Grid,
  Card,
  Button,
  CardMedia,
  CardContent,
  Container
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ButtonFav from "../components/buttonFavorite";
import Footer from "../components/footer";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: []
    };
  }

  componentDidMount() {
    this.props.getCategory(this.props.category_id);
    this.props.getProfile();
    this.props.getFavorites();
  }
  render() {
    const { category } = this.props.category;
    if (category.length === 0) {
      return (
        <div>
          <Container style={{ marginTop: "50px" }}>
            <div
              style={{
                backgroundColor: "#b71c1c",
                padding: "10px",
                color: "#fff",
                textAlign: "center"
              }}
            >
              <Typography variant="h5">No events in this category</Typography>
            </div>
          </Container>
        </div>
      );
    } else {
      const token = localStorage.getItem("token");
      return (
        <div>
          <Container style={{ marginTop: "50px" }}>
            <Grid container spacing={5}>
              {category.map((item, i) => {
                return (
                  <Grid item md={4} key={i} xs={6}>
                    <Card>
                      <div style={{ position: "relative" }}>
                        <Button
                          variant="contained"
                          color="inherit"
                          size="small"
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px"
                          }}
                        >
                          {item.price}
                        </Button>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="140"
                          image={item.image}
                          title="Contemplative Reptile"
                        />
                      </div>
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <Link
                            to={"/event/" + item.id}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography
                              gutterBottom
                              color="inherit"
                              variant="h5"
                              component="h2"
                              style={{ color: "#000", fontWeight: "bold" }}
                            >
                              {item.title.length > 200
                                ? item.title.substr(0, 200) + "..."
                                : item.title}
                            </Typography>
                          </Link>
                          {token ? <ButtonFav event_id={item.id} /> : ""}
                        </div>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {item.description.length > 200
                            ? item.description.substr(0, 200) + "..."
                            : item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category_id: ownProps.match.params.id,
    category: state.category,
    favorites: state.favorites
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCategory: category_id => {
      dispatch(getCategory(category_id));
    },
    getProfile: () => {
      dispatch(getProfile());
    },
    getFavorites: () => {
      dispatch(getFavorites());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
