import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getEvent } from "../_actions/event";
import { getProfile } from "../_actions/user";

import {
  Container,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Divider,
  Grid
} from "@material-ui/core";
import Footer from "../components/footer";
import {
  LocationOn,
  Facebook,
  Twitter,
  Share,
  CalendarToday,
  QueryBuilder,
  Assignment,
  Phone,
  MailOutline
} from "@material-ui/icons";
import BuyDialog from "../components/Dialog";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }

  componentDidMount() {
    this.props.getEvent(this.props.event_id);
    this.props.getProfile();
  }

  render() {
    const { event } = this.props.event;
    // console.log (this.formatDate (event.startTime));
    if (event.success === false) {
      return (
        <div>
          <Container style={{ marginTop: "50px" }}>
            <div
              style={{
                backgroundColor: "#b71c1c",
                padding: "10px",
                color: "#fff",
                textAlign: "center"
              }}
            >
              <Typography variant="h5">{event.message}</Typography>
            </div>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <Container maxWidth="md" style={{ marginTop: "50px" }}>
            <Card>
              <CardMedia
                component="img"
                alt={event.title}
                height="300"
                image={event.img}
                title={event.title}
              />
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="h4" color="inherit">
                    {event.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="p"
                    color="secondary"
                    style={{ textTransform: "uppercase", fontWeight: "bold" }}
                  >
                    {event.price}
                  </Typography>
                </div>
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    marginTop: "20px"
                  }}
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="h5"
                      color="secondary"
                      style={{ fontWeight: "bold" }}
                    >
                      {event.category ? event.category.name : ""}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <BuyDialog
                      price={event.priceNumber}
                      quantity="1"
                      event_id={event.id}
                    />
                  </Grid>
                </Grid>
                <Divider style={{ height: "3px", marginBottom: "20px" }} />

                <Grid container spacing={5}>
                  <Grid item sm={4}>
                    <Typography
                      variant="h5"
                      component="p"
                      style={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                      Hosted By
                    </Typography>
                    <Grid
                      container
                      spacing={1}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid item xs={5}>
                        <div
                          style={{
                            padding: "10px",
                            backgroundColor: "#000",
                            color: "#fff",
                            fontSize: "80px",
                            textAlign: "center",
                            lineHeight: "100px"
                          }}
                        >
                          {event.createdBy ? event.createdBy.name[0] : ""}
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h4" component="p">
                          {event.createdBy ? event.createdBy.name : ""}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography
                      variant="h5"
                      component="p"
                      style={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                      Date & Time
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold"
                      }}
                    >
                      <CalendarToday /> {event.startTime} - {event.endTime}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        marginTop: "20px"
                      }}
                    >
                      <QueryBuilder /> {event.timeStart} - {event.timeEnd} WIB
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography
                      variant="h5"
                      component="p"
                      style={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                      Contact Person
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        marginTop: "15px"
                      }}
                    >
                      <Assignment />
                      {event.createdBy ? event.createdBy.name : ""}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        marginTop: "15px"
                      }}
                    >
                      <Phone />
                      {event.createdBy ? event.createdBy.phoneNumber : ""}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        marginTop: "15px"
                      }}
                    >
                      <MailOutline />
                      {event.createdBy ? event.createdBy.email : ""}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Grid container spacing={4} style={{ marginTop: "50px" }}>
              <Grid item sm={6}>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <Typography
                    variant="h6"
                    component="p"
                    color="inherit"
                    style={{ fontWeight: "bold" }}
                  >
                    Event Description
                  </Typography>
                </div>
                <div style={{ textAlign: "justify" }}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                    style={{ fontFamily: "Poppins" }}
                  >
                    {event.description}
                  </Typography>
                </div>
              </Grid>
              <Grid item sm={6}>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <Typography
                    variant="h6"
                    component="p"
                    color="inherit"
                    style={{ fontWeight: "bold" }}
                  >
                    Location
                  </Typography>
                </div>
                <div style={{ textAlign: "justify", marginBottom: "20px" }}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <LocationOn fontSize="large" /> {event.address}
                  </Typography>
                </div>
                <div>
                  <iframe
                    src={event.urlMaps}
                    width="430"
                    height="430"
                    title={event.title}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    marginBottom: "30px"
                  }}
                >
                  <Typography
                    variant="h6"
                    component="p"
                    color="inherit"
                    style={{ fontWeight: "bold" }}
                  >
                    Share Event
                  </Typography>
                </div>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Facebook /> Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Twitter /> Twitter
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      size="medium"
                      color="inherit"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Share /> share
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </div>
      );
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    event_id: ownProps.match.params.id,
    event: state.event
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEvent: event_id => {
      dispatch(getEvent(event_id));
    },
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
