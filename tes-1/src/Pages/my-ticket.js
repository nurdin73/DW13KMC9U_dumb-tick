import React, { Component } from "react";
import { Typography, Container, Grid } from "@material-ui/core";
import "@material-ui/icons";
import { getTicket } from "../_actions/payments";
import { getProfile } from "../_actions/user";
import Footer from "../components/footer";

import { connect } from "react-redux";
class MyTicket extends Component {
  componentDidMount() {
    this.props.getTicket();
    this.props.getProfile();
  }

  render() {
    const { payments } = this.props.payments;
    console.log(payments);
    const img =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png";
    if (payments.result === false) {
      return (
        <div>
          <Container
            maxWidth="md"
            style={{ marginTop: "50px", minHeight: "80vh" }}
          >
            <Typography
              variant="h4"
              component="p"
              color="secondary"
              style={{
                fontFamily: "poppins",
                fontWeight: "bold",
                marginBottom: "20px"
              }}
            >
              My Ticket
            </Typography>
            <div
              style={{
                borderTop: "8px solid rgb(255, 18, 18)",
                backgroundColor: "#fff",
                padding: "20px",
                textAlign: "center"
              }}
            >
              <Container maxWidth="md">
                <Typography
                  variant="h5"
                  component="p"
                  color="secondary"
                  style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                >
                  {payments.message}
                </Typography>
              </Container>
            </div>
          </Container>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Container maxWidth="md" style={{ marginTop: "50px" }}>
            <Typography
              variant="h4"
              component="p"
              color="secondary"
              style={{
                fontFamily: "poppins",
                fontWeight: "bold",
                marginBottom: "20px"
              }}
            >
              My Ticket
            </Typography>
            <div
              style={{
                borderTop: "8px solid rgb(255, 18, 18)",
                backgroundColor: "#fff",
                padding: "20px"
              }}
            >
              <Container maxWidth="md">
                {payments.map((payment, i) => {
                  if (payment.length === 0) {
                    return (
                      <Typography variant="h5" component="p" color="error">
                        {payment.message}
                      </Typography>
                    );
                  } else {
                    return (
                      <div
                        style={{
                          backgroundColor: "#d23f3f",
                          padding: "20px",
                          marginBottom: "20px"
                        }}
                        key={i}
                      >
                        <div style={{ backgroundColor: "#fff" }}>
                          <div
                            style={{
                              backgroundColor: "#ccc",
                              padding: "5px 10px",
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                          >
                            <Grid item xs={2}>
                              <Typography
                                variant="h5"
                                component="p"
                                style={{
                                  fontFamily: "poppins",
                                  fontWeight: "bold"
                                }}
                              >
                                {payment.buyer ? payment.buyer.name : ""}
                              </Typography>
                              <Typography
                                variant="body2"
                                component="p"
                                style={{
                                  fontFamily: "poppins",
                                  fontWeight: "bold"
                                }}
                              >
                                id: {payment.buyer ? payment.buyer.id : ""}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                variant="body2"
                                component="p"
                                color="textSecondary"
                                style={{
                                  fontFamily: "poppins",
                                  fontWeight: "bold"
                                }}
                              >
                                Face Value
                                {payment.event ? payment.event.price : ""}
                              </Typography>
                              <Typography
                                variant="body2"
                                component="p"
                                color="textSecondary"
                                style={{
                                  fontFamily: "poppins",
                                  fontWeight: "bold"
                                }}
                              >
                                id: {payment.id}
                              </Typography>
                            </Grid>
                          </div>
                          <div style={{ padding: "10px" }}>
                            <Grid container spacing={2}>
                              <Grid item sm={9}>
                                <Typography
                                  variant="h5"
                                  component="p"
                                  style={{
                                    fontFamily: "poppins",
                                    fontWeight: "bold",
                                    color: "rgb(84, 75, 75)",
                                    marginTop: "20px"
                                  }}
                                >
                                  {payment.event ? payment.event.title : ""}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  component="p"
                                  color="textSecondary"
                                  style={{
                                    fontFamily: "poppins"
                                  }}
                                >
                                  {payment.event
                                    ? payment.event.startTime
                                      ? payment.event.startTime.date
                                      : ""
                                    : ""}{" "}
                                  at{" "}
                                  {payment.event
                                    ? payment.event.startTime
                                      ? payment.event.startTime.time
                                      : ""
                                    : ""}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  component="p"
                                  color="textSecondary"
                                  style={{
                                    fontFamily: "poppins"
                                  }}
                                >
                                  {payment.event ? payment.event.address : ""}
                                </Typography>
                              </Grid>
                              <Grid item sm={2}>
                                <div
                                  style={{
                                    backgroundImage: `url(${img})`,
                                    width: "180px",
                                    height: "180px",
                                    backgroundSize: "cover"
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </Container>
            </div>
          </Container>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    payments: state.payments
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTicket: () => {
      dispatch(getTicket());
    },
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTicket);
