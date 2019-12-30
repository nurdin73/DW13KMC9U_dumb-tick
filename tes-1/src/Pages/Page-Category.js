import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategory } from "../_actions/category";
import { withRouter } from "react-router-dom";
import { getProfile } from "../_actions/user";

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }
  componentDidMount() {
    this.props.getCategory(this.props.category_id);
    this.props.getProfile();
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
                        <Link
                          to={"/event/" + item.id}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            gutterBottom
                            color="inherit"
                            variant="h5"
                            component="h2"
                          >
                            {item.title}
                          </Typography>
                        </Link>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {item.description.slice(0, 200) + "..."}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category_id: ownProps.match.params.id,
    category: state.category
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCategory: category_id => {
      dispatch(getCategory(category_id));
    },
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
