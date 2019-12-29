import React, { Component } from "react";
import Header from "../components/Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getEvent } from "../_actions/event";
import {
  Container,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Divider
} from "@material-ui/core";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }

  componentDidMount() {
    this.props.getEvent(this.props.event_id);
  }
  render() {
    const { event } = this.props.event;
    console.log(this.props.event, "ini event");
    return (
      <div>
        <Header />
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
                  Rp.{event.price},-
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
      </div>
    );
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
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
