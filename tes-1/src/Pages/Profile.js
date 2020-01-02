import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../_actions/user";
import Footer from "../components/footer";
import { Container, Typography, Avatar, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Favorites from "../components/favorite";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    const { profile } = this.props.profile;

    return (
      <div>
        <Container
          maxWidth="md"
          style={{ marginTop: "50px", minHeight: "100vh" }}
        >
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant="h3"
                component="p"
                style={{ fontWeight: "bold", color: "rgb(97, 97, 97)" }}
              >
                {profile.name}
              </Typography>
              <Typography
                variant="h5"
                component="p"
                style={{ fontWeight: 300, color: "rgb(97, 97, 97)" }}
              >
                {profile.phone}
              </Typography>
              <Typography
                variant="h5"
                component="p"
                style={{
                  fontWeight: 100,
                  color: "rgb(97, 97, 97)",
                  marginBottom: "10px"
                }}
              >
                {profile.email}
              </Typography>
              <Link to="/edit-profile" style={{ textDecoration: "none" }}>
                <Button color="secondary" variant="contained" size="medium">
                  Edit PRofile
                </Button>
              </Link>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Avatar
                style={{
                  fontSize: "100px",
                  width: "150px",
                  height: "150px",
                  textTransform: "uppercase"
                }}
              >
                {profile.initial}
              </Avatar>
            </Grid>
          </Grid>
          <Favorites />
        </Container>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    favorites: state.favorites
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
