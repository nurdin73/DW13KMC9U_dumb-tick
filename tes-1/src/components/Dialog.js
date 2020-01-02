import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  Typography
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { setOrder } from "../_actions/payments";

function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { handleSubmit, register, errors } = useForm();
  const [buy, setBuy] = React.useState({
    price: props.price,
    quantity: props.quantity,
    totalPrice: "",
    message: ""
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = event => {
    setBuy({
      ...buy,
      quantity: event.target.value,
      totalPrice: event.target.value * props.price
    });
  };
  const onSubmit = values => {
    if (values.quantity < 1) {
      setBuy({ ...buy, message: "Quantity must be greater than 0" });
    } else {
      props.addPayment(values);
      //   const { addPayment } = props.addPayment;
      //   if (addPayment.success === false) {
      //     setBuy({ ...buy, message: addPayment.message });
      //   } else {
      window.location.href = "http://localhost:3000/payment";
      //   }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Buy
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Input Your Quantity Ticket
        </DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              Enter the number of tickets that you want to buy!
              <div
                style={{
                  backgroundColor: "#f50000",
                  padding: "10px",
                  borderRadius: "5px",
                  color: "#fff",
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  fontWeight: "bold"
                }}
              >
                <Typography variant="body2" component="p">
                  {buy.message}
                </Typography>
              </div>
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <FormControl>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="quantity"
                    id="quantity"
                    label="Quantity"
                    type="number"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    inputRef={register({
                      required: "required",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "quantity value is number only!"
                      },
                      minLength: {
                        value: 1,
                        message: "Minimal Quantity is 1"
                      }
                    })}
                  />
                  <FormHelperText>
                    {errors.quantity && errors.quantity.message}
                  </FormHelperText>
                </FormControl>
                <input
                  type="hidden"
                  name="event_id"
                  value={props.event_id}
                  ref={register}
                />
              </Grid>
              <Grid item sm={9}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="totalPrice"
                  label="Total Price"
                  type="number"
                  variant="outlined"
                  value={buy.totalPrice}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit" autoFocus>
              Shop
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    addPayment: state.addPayment
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addPayment: values => {
      dispatch(setOrder(values));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog);
