import React from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Avatar,
  Button
} from "@material-ui/core";

import Favorites from "../components/favorite";
import { getProfile } from "../_actions/user";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
function EditProfile(props) {
  const { profile } = props.profile;
  console.log(profile.email);
  const [Values, setValues] = React.useState({
    email: profile.email,
    name: profile.name,
    phone: profile.phone
  });
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    console.log(values);
  };
  return (
    <div>
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Typography
          variant="h4"
          component="p"
          color="secondary"
          style={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          Edit Profile
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={8}>
            <form
              autoComplete="off"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth style={{ marginBottom: "15px" }}>
                <InputLabel htmlFor="email">Name</InputLabel>
                <Input
                  id="email"
                  name="name"
                  aria-describedby="my-helper-email"
                  value={Values.name}
                  inputRef={register({
                    required: "Required",
                    pattern: {
                      value: /\w/,
                      message: "Value Name Not number"
                    }
                  })}
                />
                <FormHelperText id="my-helper-email" color="error">
                  {errors.name && errors.name.message}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: "15px" }}>
                <InputLabel htmlFor="email">Phone</InputLabel>
                <Input
                  id="email"
                  name="phone"
                  aria-describedby="my-helper-email"
                  inputRef={register({
                    required: "Required",
                    minLength: {
                      value: 11,
                      message: "phone number too short (11 key)"
                    },
                    pattern: {
                      value: /\d+/,
                      message: "Invalid phone number"
                    }
                  })}
                  value={Values.phone}
                />
                <FormHelperText id="my-helper-email">
                  {errors.phone && errors.phone.message}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: "15px" }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  aria-describedby="my-helper-email"
                  value={Values.email}
                  inputRef={register({
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "invalid email address"
                    }
                  })}
                />
                <FormHelperText id="my-helper-email">
                  {errors.email && errors.email.message}
                </FormHelperText>
              </FormControl>
              <Button type="submit" variant="contained" color="secondary">
                Save
              </Button>
            </form>
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              style={{ width: "200px", height: "200px", fontSize: "140px" }}
            >
              {profile.initial}
            </Avatar>
          </Grid>
        </Grid>

        <Favorites />
      </Container>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
