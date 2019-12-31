import React, { Component } from "react";
import {
  Container,
  FormControl,
  Input,
  InputAdornment,
  Typography,
  Grid,
  Paper
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { Search } from "@material-ui/icons";
import { connect } from "react-redux";

import { getCategories } from "../../_actions/categories";
import { getProfile } from "../../_actions/user";
import Event from "../../components/eventTodays";
import Ongoing from "../../components/eventsOnGoing";

import Footer from "../../components/footer";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getProfile();
  }

  render() {
    const { data } = this.props.categories;
    const { login } = this.props.login;
    return (
      <div>
        <Container style={{ marginTop: "50px" }}>
          <div
            style={{
              backgroundColor: "rgb(245, 0, 87)",
              padding: "10px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "50px"
            }}
          >
            <Typography>{login.message}</Typography>
          </div>
          <form method="get" action="/events" autoComplete="off">
            <FormControl fullWidth>
              <Input
                id="input-with-icon-adornment"
                name="title"
                placeholder="Search"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        </Container>
        <Container style={{ marginTop: "20px" }}>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", marginBottom: "10px" }}
            color="secondary"
          >
            Category
          </Typography>
          <Grid container spacing={5}>
            {data.map((item, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <Link
                    to={"/category/" + item.id + "/events"}
                    style={{ textDecoration: "none" }}
                  >
                    <Paper
                      style={{
                        backgroundImage: `url(${item.img})`,
                        padding: "10px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        textAlign: "center",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "30px"
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase"
                        }}
                        color="inherit"
                      >
                        {item.name}
                      </Typography>
                    </Paper>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <Event />
        <Ongoing />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    login: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      dispatch(getCategories());
    },
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
