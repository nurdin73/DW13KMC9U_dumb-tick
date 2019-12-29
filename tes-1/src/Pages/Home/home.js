import React, { Component } from "react";
import Header from "../../components/Header";
import {
  Container,
  FormControl,
  Input,
  InputAdornment,
  Typography,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { Search } from "@material-ui/icons";
import { connect } from "react-redux";

import { getCategories } from "../../_actions/categories";
import { getEvents } from "../../_actions/events";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getEvents();
  }

  render() {
    const { data } = this.props.categories;
    const { events } = this.props.events;
    const { login } = this.props.login;
    return (
      <div>
        <Header />
        <Container style={{ marginTop: "50px" }}>
          <div
            style={{
              backgroundColor: "rgb(245, 0, 87)",
              padding: "10px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "50px"
            }}
          >
            <Typography>{login.message}</Typography>
          </div>
          <form method="get" action="/events" autoComplete="off">
            <FormControl fullWidth>
              <Input
                id="input-with-icon-adornment"
                name="title"
                placeholder="Search"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        </Container>
        <Container style={{ marginTop: "20px" }}>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", marginBottom: "10px" }}
            color="secondary"
          >
            Category
          </Typography>
          <Grid container spacing={5}>
            {data.map((item, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <Link
                    to={"/category/" + item.id + "/events"}
                    style={{ textDecoration: "none" }}
                  >
                    <Paper
                      style={{
                        backgroundImage: `url(${item.img})`,
                        padding: "10px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        textAlign: "center",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "30px"
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase"
                        }}
                        color="inherit"
                      >
                        {item.name}
                      </Typography>
                    </Paper>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Container>
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
    categories: state.categories,
    events: state.events,
    login: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      dispatch(getCategories());
    },
    getEvents: () => {
      dispatch(getEvents());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
