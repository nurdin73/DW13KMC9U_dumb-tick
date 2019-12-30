import React, { Component } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEvents } from "../_actions/events";

class eventTodays extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const { events } = this.props.events;
    if (events.success === false) {
      return (
        <div>
          <Container style={{ marginTop: "40px" }}>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", marginBottom: "10px" }}
              color="secondary"
            >
              Today
            </Typography>
            <div style={{ textAlign: "center", backgroundColor:"#d50000", borderRadius: "6px", padding: "10px", margin: "20px 0" }}>
              <Typography
                variant="h5"
                style={{ fontWeight: "bold", color:"#fff" }}
              >
                {events.message}
              </Typography>
            </div>
          </Container>
        </div>
      );
    }
    return (
      <div>
        <Container style={{ marginTop: "40px" }}>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", marginBottom: "10px" }}
            color="secondary"
          >
            Today
          </Typography>
          <Grid container spacing={5}>
            {events.map((event, i) => {
              return (
                <Grid item md={4} key={i} xs={6}>
                  <Card>
                    <div style={{ position: "relative" }}>
                      <Button
                        variant="contained"
                        color="inherit"
                        size="small"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px"
                        }}
                      >
                        {event.price}
                      </Button>
                      <CardMedia
                        component="img"
                        alt={event.title}
                        height="140"
                        image={event.image}
                        title={event.title}
                      />
                    </div>
                    <CardContent>
                      <Link
                        to={"/event/" + event.id}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          gutterBottom
                          color="inherit"
                          variant="h5"
                          component="h2"
                        >
                          {event.title}
                        </Typography>
                      </Link>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {event.description.slice(0, 200) + "..."}
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
const mapStateToProps = state => {
  return {
    events: state.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => {
      dispatch(getEvents());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(eventTodays);
