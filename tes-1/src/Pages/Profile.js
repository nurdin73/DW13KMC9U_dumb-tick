import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../_actions/user";
import { Container, Typography, Avatar } from "@material-ui/core";
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
        <Container style={{ marginTop: "50px" }}>
          <Typography
            variant="h4"
            component="p"
            color="secondary"
            style={{ fontWeight: "bold" }}
          >
            Profile
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "700px"
              }}
            >
              <div>
                <Typography
                  variant="h4"
                  component="p"
                  style={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  {profile.name}
                </Typography>
                <Typography variant="h5" component="p">
                  {profile.phone}
                </Typography>
                <Typography variant="h5" component="p">
                  {profile.email}
                </Typography>
              </div>
              <Link
                to="/edit-profile"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  backgroundColor: "#f50057",
                  padding: "5px",
                  borderRadius: "5px",
                  height: "20px"
                }}
              >
                <Typography>Edit Profile</Typography>
              </Link>
              <Avatar
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "60px",
                  textTransform: "uppercase"
                }}
              >
                {profile.initial}
              </Avatar>
            </div>
          </div>
          <Typography
            variant="h4"
            component="p"
            color="secondary"
            style={{ marginTop: "40px", fontWeight: "bold" }}
          >
            Favorites
          </Typography>
          <Favorites />
        </Container>
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
