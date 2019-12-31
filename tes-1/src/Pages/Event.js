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
  Divider
} from "@material-ui/core";
import Footer from "../components/footer";
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
    console.log(event.length);
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
          <Container style={{ marginTop: "50px" }}>
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
                  <Typography variant="h5" color="inherit">
                    {event.title}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    style={{ fontWeight: "bold" }}
                  >
                    {event.price}
                  </Button>
                </div>
                <Typography
                  variant="body1"
                  color="secondary"
                  style={{ marginTop: "30px", marginBottom: "10px" }}
                >
                  {event.category_name}
                </Typography>
                <Divider />
              </CardContent>
            </Card>
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
