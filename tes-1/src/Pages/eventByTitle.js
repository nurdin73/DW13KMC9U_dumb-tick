import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Footer from "../components/footer";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import Axios from "axios";
import ButtonFav from "../components/buttonFavorite";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Events(props) {
  const [data, setData] = React.useState({
    events: []
  });
  let query = useQuery();
  const token = localStorage.getItem("token");
  const API = `https://dumtick-app.herokuapp.com/api/v1/events?title=${query.get("title")}`;

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios({
        method: "GET",
        url: API
      });
      setData({ events: result.data });
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await Axios({
  //         method: "get",
  //         url: API
  //       });
  //       setData({ events: result.data });
  //     };
  //     fetchData();
  //   }, []);
  if (data.events.success === false) {
    return (
      <div>
        <Container style={{ minHeight: "10vh", marginTop: "40px" }}>
          <h1>{data.events.message}</h1>
        </Container>
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Container style={{ minHeight: "10vh", marginTop: "40px" }}>
        <Grid container spacing={5}>
          {data.events.map((event, i) => {
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
      <Footer />
    </div>
  );
}

export default Events;

Events.propTypes = {};
