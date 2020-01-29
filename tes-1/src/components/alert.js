import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = id => event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    Axios({
      method: "patch",
      url: `https://dumtick-app.herokuapp.com/api/v1/order/${id}`,
      data: {
        status: "confirmed"
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      window.location.href = "http://localhost:3000/payment";
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleClickOpen}
        style={{
          boxShadow: "none",
          textTransform: "capitalize",
          fontWeight: "bold"
        }}
      >
        Confirm
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Event: {props.payment_event}
        </DialogTitle>
        <DialogContent style={{ width: "400px" }}>
          <DialogContentText id="alert-dialog-description">
            Are you sure to confirm this payment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="contained"
            style={{
              boxShadow: "none",
              textTransform: "capitalize",
              fontWeight: "bold"
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={handleSubmit(props.payment_id)}
            color="primary"
            autoFocus
            variant="contained"
            style={{
              boxShadow: "none",
              textTransform: "capitalize",
              fontWeight: "bold"
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
