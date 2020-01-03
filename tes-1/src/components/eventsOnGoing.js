import React, { Component } from "react";
import { getEventOngoing } from "../_actions/events";
import { connect } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ButtonFav from "../components/buttonFavorite";
class eventsOnGoing extends Component {
  constructor(props) {
    super(props);
    this.state = { favorite: [] };
  }

  componentDidMount() {
    this.props.getEventOngoing();
  }

  render() {
    // console.log(this.props.onGoing);
    const { onGoing } = this.props.onGoing;
    console.log(onGoing.success, "ini on going");
    if (onGoing.success === false) {
      return (
        <div>
          <Container style={{ marginTop: "40px" }}>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", marginBottom: "10px" }}
              color="secondary"
            >
              UpComing Events
            </Typography>
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#d50000",
                borderRadius: "6px",
                padding: "10px",
                margin: "20px 0"
              }}
            >
              <Typography
                variant="h5"
                style={{ fontWeight: "bold", color: "#fff" }}
              >
                {onGoing.message}
              </Typography>
            </div>
          </Container>
        </div>
      );
    } else {
      const token = localStorage.getItem("token");
      return (
        <div>
          <Container style={{ marginTop: "40px" }}>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", marginBottom: "10px" }}
              color="secondary"
            >
              Up Coming Events
            </Typography>
            <Grid container spacing={5}>
              {onGoing.map((event, i) => {
                return (
                  <Grid item md={4} key={i} xs={6}>
                    <Card>
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            padding: "5px",
                            backgroundColor: "#fff",
                            color: "#000",
                            fontWeight: 500
                          }}
                        >
                          {event.price}
                        </div>
                        <CardMedia
                          component="img"
                          alt={event.title}
                          height="140"
                          image={event.image}
                          title={event.title}
                        />
                      </div>
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <Link
                            to={"/event/" + event.id}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography
                              gutterBottom
                              color="inherit"
                              variant="h5"
                              component="h2"
                              style={{ color: "#000", fontWeight: "bold" }}
                            >
                              {event.title.length > 20
                                ? event.title.substr(0, 10) + "..."
                                : event.title}
                            </Typography>
                          </Link>
                          {token ? <ButtonFav event_id={event.id} /> : ""}
                        </div>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {event.description.length > 200
                            ? event.description.substr(0, 200) + "..."
                            : event.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    onGoing: state.ongoing
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEventOngoing: () => {
      dispatch(getEventOngoing());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(eventsOnGoing);
