import React, { Component } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
class Event extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }

  render() {
    return (
      <div>
        <Card>
          <div style={{ position: "relative" }}>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              Free
            </Button>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://digitalbarker.com/wp-content/uploads/2019/09/Microsoft-bosque-programming-language.jpg"
              title="Contemplative Reptile"
            />
          </div>
          <CardContent>
            <Link to="/detail" style={{ textDecoration: "none" }}>
              <Typography
                gutterBottom
                color="inherit"
                variant="h5"
                component="h2"
              >
                Lizard
              </Typography>
            </Link>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Event;
