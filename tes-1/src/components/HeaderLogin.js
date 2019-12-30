import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {
  Container,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Drawer
} from "@material-ui/core";
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
  list: {
    width: 250
  },
  title: {
    flexGrow: 1
  }
}));
function ButtonAppBar(props) {
  const { profile } = props.profile;

  const classes = useStyles();
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
            <Typography
              variant="subtitle1"
              component="p"
              style={{ fontWeight: "bold" }}
            >
              {profile.name}
            </Typography>
            <TemporaryDrawer
              avatar={profile.initial}
              email={profile.email}
              name={profile.name}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const lisData = [
    {
      target: "/profile",
      name: "Profile"
    },
    {
      target: "/my-ticket",
      name: "My Ticket"
    },
    {
      target: "/payment",
      name: "Payment"
    },
    {
      target: "/add-event",
      name: "Add Event"
    },
    {
      target: "/logout",
      name: "Logout"
    }
  ];
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <div style={{ display: "flex", padding: "15px", alignItems: "center" }}>
        <Avatar>{props.avatar}</Avatar>
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="body1">{props.name}</Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ fontWeight: "bold" }}
          >
            {props.email}
          </Typography>
        </div>
      </div>
      <List>
        {lisData.map((text, index) => (
          <Link
            to={text.target}
            key={index}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              textTransform: "capitalized",
              color: "#35424a"
            }}
          >
            <ListItem button>
              <ListItemText
                primary={text.name}
                style={{ fontWeight: "bold" }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer("right", true)}>
        <Avatar>{props.avatar}</Avatar>
      </IconButton>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
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
