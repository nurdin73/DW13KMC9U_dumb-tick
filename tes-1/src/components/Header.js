import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
  Container,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {useForm} from 'react-hook-form';
import {setUsers, setLogin} from '../_actions/user';
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing (2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing (1),
    top: theme.spacing (1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles (styles) (props => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose
        ? <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles (theme => ({
  root: {
    padding: theme.spacing (2),
  },
})) (MuiDialogContent);

const useStyles = makeStyles (theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing (2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar (props) {
  const classes = useStyles ();
  const [openLogin, setOpenLogin] = React.useState (false);
  const [openRegister, setOpenRegister] = React.useState (false);

  const {register, handleSubmit, errors} = useForm ();

  const [values, setValues] = React.useState ({
    password: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues ({...values, [prop]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setValues ({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = event => {
    event.preventDefault ();
  };

  const handleClickOpen = () => {
    setOpenLogin (true);
  };
  const handleClose = () => {
    setOpenLogin (false);
  };
  const handleClickOpen1 = () => {
    setOpenRegister (true);
  };
  const handleClose1 = () => {
    setOpenRegister (false);
  };

  // integrate global state
  const onSubmit = (data, e) => {
    e.target.reset ();
    props.setUsers (data);
  };
  const onSubmitLogin = (data, e) => {
    e.target.reset ();
    props.setLogin (data);
  };
  const {signUp} = props.signUp;
  if (signUp.message === 'success') {
    localStorage.setItem ('token', signUp.token);
    window.location.href = 'http://localhost:3000';
  }

  // login
  const {login} = props.login;
  if (login.message === 'success') {
    localStorage.setItem ('token', login.token);
    window.location.href = 'http://localhost:3000';
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}
              >
                Dumb-Tick
              </Link>
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleClickOpen1}
              style={{marginRight: '10px'}}
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
        <DialogContent dividers style={{width: '500px'}}>
          <form autoComplete="off" onSubmit={handleSubmit (onSubmitLogin)}>
            <FormControl fullWidth style={{marginBottom: '15px'}}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                aria-describedby="my-helper-username"
                inputRef={register ({
                  required: 'Required',
                  minLength: {
                    value: 5,
                    message: 'Your username too short',
                  },
                })}
              />
              <FormHelperText id="my-helper-username">
                {errors.username && errors.username.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth style={{marginBottom: '15px'}}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                name="password"
                // value={values.password}
                onChange={handleChange ('password')}
                inputRef={register ({
                  required: 'Required',
                  minLength: {
                    value: 8,
                    message: 'Your password too short',
                  },
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="my-helper-username">
                {errors.password && errors.password.message}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              fullWidth
              type="submit"
              onClick={handleClose}
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
        <DialogContent dividers style={{width: '500px'}}>
          <form autoComplete="off" onSubmit={handleSubmit (onSubmit)}>
            <FormControl fullWidth style={{marginBottom: '15px'}}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                aria-describedby="my-helper-name"
                inputRef={register ({
                  required: 'required',
                  pattern: {
                    value: /\w/,
                    message: 'Value Name Not number',
                  },
                })}
              />
              <FormHelperText id="my-helper-username">
                {errors.name && errors.name.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth style={{marginBottom: '15px'}}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                aria-describedby="my-helper-email"
                inputRef={register ({
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              <FormHelperText id="my-helper-email">
                {errors.email && errors.email.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth style={{marginBottom: '15px'}}>
              <InputLabel htmlFor="phone">Phone Number</InputLabel>
              <Input
                id="phone"
                name="phone"
                aria-describedby="my-helper-phone"
                inputRef={register ({
                  required: 'Required',
                  minLength: {
                    value: 11,
                    message: 'phone number too short (11 key)',
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Invalid phone number',
                  },
                })}
              />
              <FormHelperText id="my-helper-email" color="secondary">
                {errors.phone && errors.phone.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth style={{marginBottom: '15px'}}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                aria-describedby="my-helper-username"
                inputRef={register ({
                  required: 'Required',
                  minLength: {
                    value: 5,
                    message: 'Your username too short',
                  },
                })}
              />
              <FormHelperText id="my-helper-username">
                {errors.username && errors.username.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth style={{marginBottom: '15px'}}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                name="password"
                // value={values.password}
                onChange={handleChange ('password')}
                inputRef={register ({
                  required: 'Required',
                  minLength: {
                    value: 8,
                    message: 'Your password too short',
                  },
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="my-helper-username">
                {errors.password && errors.password.message}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              fullWidth
              type="submit"
              onClick={handleClose1}
            >
              Register
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    signUp: state.signUp,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUsers: data => {
      dispatch (setUsers (data));
    },
    setLogin: data => {
      dispatch (setLogin (data));
    },
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (ButtonAppBar);
