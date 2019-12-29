import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Container, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { getProfile } from "../_actions/user";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  const { profile } = props.profile;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  textTransform: "uppercase",
                  fontWeight: "bold"
                }}
              >
                Dumb-Tick
              </Link>
            </Typography>
            <IconButton>
              <Avatar>{profile.initial}</Avatar>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
