import React, { Component } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Instagram, Twitter } from "@material-ui/icons";
import { connect } from "react-redux";
import { getProfile } from "../_actions/user";
import { getCategories } from "../_actions/categories";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }
  componentDidMount() {
    this.props.getProfile();
    this.props.getCategories();
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#f50057",
          padding: "40px",
          marginTop: "50px"
        }}
      >
        <Container style={{ color: "#fff" }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                style={{ fontWeight: "bold", fontFamily: "poppins" }}
              >
                DumbTick
              </Typography>
              <Typography variant="body1" style={{ fontFamily: "poppins" }}>
                Dumb-Tick is a web-based platform that provides tickets for
                various events around sports, music, science, and programming
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <div style={{ marginBottom: "20px" }}>
                <Typography
                  variant="body1"
                  style={{ fontWeight: "bold", fontFamily: "poppins" }}
                >
                  Links
                </Typography>
                <Link
                  to="/about"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontFamily: "poppins"
                  }}
                >
                  <Typography variant="body2">About Us</Typography>
                </Link>
              </div>
              <div>
                <Typography
                  variant="body1"
                  style={{ fontWeight: "bold", fontFamily: "poppins" }}
                >
                  Follow Us On
                </Typography>
                <Link
                  to="/instagram"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Instagram />
                  <Typography
                    variant="body2"
                    style={{ marginLeft: "2px", fontFamily: "poppins" }}
                  >
                    Instagram
                  </Typography>
                </Link>
                <Link
                  to="/twitter"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Twitter />
                  <Typography
                    variant="body2"
                    style={{ marginLeft: "2px", fontFamily: "poppins" }}
                  >
                    Twitter
                  </Typography>
                </Link>
              </div>
            </Grid>
            <Grid item md={4}>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold", fontFamily: "poppins" }}
              >
                Have a question?
              </Typography>
              <Typography
                variant="subtitle2"
                style={{ fontWeight: "bold", fontFamily: "poppins" }}
              >
                DumbTick
              </Typography>
              <Typography variant="subtitle2" style={{ fontFamily: "poppins" }}>
                email: support@dumbtick.com
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    categories: state.categories
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProfile: () => {
      dispatch(getProfile());
    },
    getCategories: () => {
      dispatch(getCategories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
