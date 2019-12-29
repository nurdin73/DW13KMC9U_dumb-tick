import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Container, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import { setLog } from "../_actions/user";
import { connect } from "react-redux";
import Axios from "axios";
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

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

function ButtonAppBar() {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);

  const [Login, setLogin] = React.useState({
    username: "",
    password: ""
  });

  const handleChangeUsername = event => {
    setLogin({
      ...Login,
      username: event.target.value
    });
  };

  const handleChangePassword = event => {
    setLogin({
      ...Login,
      password: event.target.value
    });
  };

  const handleSubmit = prop => () => {
    [prop].getLog(this.props.username, this.props.password);
  };

  const handleClickOpen = () => {
    setOpenLogin(true);
  };
  const handleClose = () => {
    setOpenLogin(false);
  };
  const handleClickOpen1 = () => {
    setOpenRegister(true);
  };
  const handleClose1 = () => {
    setOpenRegister(false);
  };

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
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleClickOpen1}
              style={{ marginRight: "10px" }}
            >
              Register
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleClickOpen}
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openLogin}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Login
        </DialogTitle>
        <DialogContent dividers style={{ width: "500px" }}>
          <form onSubmit={handleSubmit} method="post">
            <TextField
              id="standard-basic"
              type="text"
              label="Username"
              fullWidth
              style={{ marginBottom: "30px" }}
              value={Login.username}
              onChange={handleChangeUsername}
            />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              fullWidth
              value={Login.password}
              onChange={handleChangePassword}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{ marginTop: "20px" }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={openRegister}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose1}>
          Register
        </DialogTitle>
        <DialogContent dividers>
          <from method="post">
            <TextField
              id="standard-basic"
              type="text"
              label="Name"
              fullWidth
              style={{ marginBottom: "30px" }}
            />
            <TextField
              id="standard-basic"
              type="text"
              label="Email"
              fullWidth
              style={{ marginBottom: "30px" }}
            />
            <TextField
              id="standard-basic"
              type="number"
              label="Phone"
              fullWidth
              style={{ marginBottom: "30px" }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              fullWidth
              style={{ marginBottom: "30px" }}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{ marginTop: "20px" }}
            >
              Register
            </Button>
          </from>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.username,
    password: state.password
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLog: (username, password) => {
      dispatch(setLog(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
