import React, { Component } from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { getPayment } from "../_actions/payments";
import { getProfile } from "../_actions/user";
import AlertConfirm from "../components/alert";
import { connect } from "react-redux";
import Footer from "../components/footer";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }

  componentDidMount() {
    this.props.getPayment();
    this.props.getProfile();
  }

  handleConfirm = id => event => {
    alert(id);
  };

  render() {
    const { paymentPending } = this.props.payment;
    console.log(paymentPending.length);
    const img =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png";
    if (paymentPending.result === false) {
      return (
        <div>
          <Container
            maxWidth="md"
            style={{ marginTop: "40px", minHeight: "80vh" }}
          >
            <Typography
              variant="h4"
              component="p"
              color="secondary"
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                marginBottom: "20px"
              }}
            >
              Payment
            </Typography>
            <div>
              <Grid container>
                <Grid
                  item
                  sm={6}
                  style={{
                    backgroundColor: "#ec3939",
                    padding: "15px",
                    color: "#fff",
                    textAlign: "center"
                  }}
                >
                  <Typography variant="h4" component="p">
                    Payment
                  </Typography>
                </Grid>
              </Grid>
              <div
                style={{
                  borderTop: "10px solid #ec3939",
                  backgroundColor: "#fff",
                  padding: "20px",
                  textAlign: "center"
                }}
              >
                <Typography
                  variant="h5"
                  component="p"
                  color="secondary"
                  style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                >
                  {paymentPending.message}
                </Typography>
              </div>
            </div>
          </Container>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Container maxWidth="md" style={{ marginTop: "40px" }}>
            <Typography
              variant="h4"
              component="p"
              color="secondary"
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                marginBottom: "20px"
              }}
            >
              Payment
            </Typography>
            <div>
              <Grid container>
                <Grid
                  item
                  sm={6}
                  style={{
                    backgroundColor: "#ec3939",
                    padding: "15px",
                    color: "#fff",
                    textAlign: "center"
                  }}
                >
                  <Typography variant="h4" component="p">
                    Payment
                  </Typography>
                </Grid>
              </Grid>
              <div
                style={{
                  borderTop: "10px solid #ec3939",
                  backgroundColor: "#fff",
                  padding: "20px"
                }}
              >
                {paymentPending.map((payment, i) => {
                  if (payment.length === 0) {
                    return <h1>No Payment</h1>;
                  } else {
                    return (
                      <div>
                        <div
                          style={{
                            padding: "20px",
                            backgroundColor: "rgb(236, 103, 103)",
                            marginTop: "30px"
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#fff"
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: "#ccc",
                                padding: "10px",
                                display: "flex",
                                justifyContent: "space-between"
                              }}
                            >
                              <Grid item xs={3}>
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
                                  Face Value{" "}
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
                                    {payment.buyer ? payment.event.title : ""}
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
                        <div
                          style={{
                            padding: "20px 50px",
                            borderBottom: "2px solid #ccc",
                            margin: "20px 0"
                          }}
                        >
                          <Typography
                            variant="h5"
                            component="p"
                            color="textSecondary"
                            style={{
                              fontWeight: "bold",
                              fontFamily: "Poppins"
                            }}
                          >
                            Shopping Summary
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center"
                            }}
                          >
                            <Typography
                              variant="body1"
                              component="p"
                              color="textSecondary"
                              style={{ fontFamily: "Poppins" }}
                            >
                              Total Price ({payment.quantity} Items)
                            </Typography>
                            <Typography
                              variant="body1"
                              component="p"
                              color="textSecondary"
                              style={{ fontFamily: "Poppins" }}
                            >
                              {payment.totalPrice}
                            </Typography>
                          </div>
                        </div>
                        <Grid container spacing={4}>
                          <Grid
                            item
                            sm={6}
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            <div>
                              <Typography
                                variant="h6"
                                component="p"
                                color="textSecondary"
                                style={{
                                  fontWeight: "bold",
                                  fontFamily: "Poppins"
                                }}
                              >
                                Prove a payment
                              </Typography>
                              <div
                                style={{
                                  backgroundImage: `url(${payment.attachment})`,
                                  backgroundSize: "cover",
                                  width: "200px",
                                  height: "200px"
                                }}
                              ></div>
                            </div>
                          </Grid>
                          <Grid
                            item
                            sm={6}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <AlertConfirm
                              payment_id={payment.id}
                              payment_event={
                                payment.buyer ? payment.event.title : ""
                              }
                              payment_event_address={
                                payment.event ? payment.event.address : ""
                              }
                            />
                          </Grid>
                        </Grid>
                      </div>
                    );
                  }
                })}
              </div>
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
    payment: state.paymentPending
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPayment: () => {
      dispatch(getPayment());
    },
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
