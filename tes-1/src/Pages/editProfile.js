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
import { getProfile, setProfile } from "../_actions/user";
import Footer from "../components/footer";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
function EditProfile(props) {
  const { profile } = props.profile;
  const { update } = props.update;
  const [Values, setValues] = React.useState({
    email: profile.email,
    name: profile.name,
    phone: profile.phone
  });

  const handleEmail = event => {
    setValues({ email: event.target.value });
  };
  const handleName = event => {
    setValues({ name: event.target.value });
  };
  const handlePhone = event => {
    setValues({ phone: event.target.value });
  };
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    console.log(values);
    props.setProfile(values);
    if (update.status === "failed") {
      alert(update.message);
    } else {
      window.location.href = "http://localhost:3000/profile";
    }
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
        <div
          style={{
            padding: "5px",
            backgroundColor: "#f50057",
            color: "#fff",
            fontWeight: "bold",
            marginBottom: "20px",
            borderRadius: "5px"
          }}
        >
          <Typography variant="subtitle1" component="p">
            {update.message}
          </Typography>
        </div>
        <Grid container spacing={5}>
          <Grid item xs={8}>
            <form
              autoComplete="off"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth style={{ marginBottom: "15px" }}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  aria-describedby="my-helper-name"
                  value={Values.name}
                  onChange={handleName}
                  inputRef={register({
                    required: "Required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Value Name Not number"
                    }
                  })}
                />
                <FormHelperText id="my-helper-name" color="error">
                  {errors.name && errors.name.message}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: "15px" }}>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Input
                  id="phone"
                  name="phone"
                  aria-describedby="my-helper-phone"
                  onChange={handlePhone}
                  value={Values.phone}
                  inputRef={register({
                    required: "Required",
                    minLength: {
                      value: 11,
                      message: "phone number too short (11 key)"
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Invalid phone number"
                    }
                  })}
                />
                <FormHelperText id="my-helper-phone">
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
                  onChange={handleEmail}
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
              <input
                type="hidden"
                value={profile.id}
                ref={register}
                name="id"
              />
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
              style={{
                width: "200px",
                height: "200px",
                fontSize: "140px",
                textTransform: "uppercase"
              }}
            >
              {profile.initial}
            </Avatar>
          </Grid>
        </Grid>

        <Favorites />
      </Container>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    update: state.update
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProfile: () => {
      dispatch(getProfile());
    },
    setProfile: values => {
      dispatch(setProfile(values));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
