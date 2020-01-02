import React from "react";
import Footer from "../components/footer";
import {
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { getCategories } from "../_actions/categories";
import { addEvent } from "../_actions/event";
function AddEvent(props) {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    props.addEvent(values);
    setTimeout(() => 3000);
  };
  const { data } = props.categories;
  const { addEvent } = props.addEvent;
  console.log(addEvent);
  //   if (addEvent.status === "failed") {
  //     alert(addEvent.message);
  //   } else {
  //     window.location.href = "http://localhost:3000/profile";
  //   }

  return (
    <div>
      <Container maxWidth="md">
        <h1 style={{ color: "#ec473a" }}>Add Event</h1>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel htmlFor="title">Title Event</InputLabel>
            <Input
              id="title"
              placeholder="Title Event"
              name="title"
              aria-describedby="my-helper-title"
              inputRef={register({
                required: "Required"
              })}
              style={{
                backgroundColor: "transparent",
                fontFamily: "Poppins"
              }}
            />
            <FormHelperText id="my-helper-title">
              {errors.title && errors.title.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <select
              name="category_id"
              ref={register({ required: "required" })}
              style={{
                fontSize: "17px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                borderBottom: "2px solid rgb(103, 83, 83)",
                color: "rgb(103, 83, 83)",
                padding: "10px 0",
                WebkitAppearance: "none",
                fontFamily: "Poppins"
              }}
            >
              {data.map((categories, i) => {
                return (
                  <option key={i} value={categories.id}>
                    {categories.name}
                  </option>
                );
              })}
            </select>
            <FormHelperText id="my-helper-image">
              {errors.category && errors.category.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel htmlFor="image">Link Pamflet</InputLabel>
            <Input
              id="image"
              placeholder="Link Pamflet"
              name="image"
              aria-describedby="my-helper-image"
              inputRef={register({
                required: "Required"
              })}
              style={{
                backgroundColor: "transparent",
                fontFamily: "Poppins"
              }}
            />
            <FormHelperText id="my-helper-image">
              {errors.image && errors.image.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel htmlFor="startTime">Start Time</InputLabel>
            <Input
              id="startTime"
              name="startTime"
              type="datetime-local"
              aria-describedby="my-helper-startTime"
              inputRef={register({
                required: "Required"
              })}
              style={{
                backgroundColor: "transparent",
                fontFamily: "Poppins"
              }}
            />
            <FormHelperText id="my-helper-startTime">
              {errors.startTime && errors.startTime.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel htmlFor="endTime">End Time</InputLabel>
            <Input
              id="endTime"
              name="endTime"
              type="datetime-local"
              aria-describedby="my-helper-endTime"
              inputRef={register({
                required: "Required"
              })}
              style={{
                backgroundColor: "transparent",
                fontFamily: "Poppins"
              }}
            />
            <FormHelperText id="my-helper-endTime">
              {errors.endTime && errors.endTime.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              placeholder="Price"
              name="price"
              aria-describedby="my-helper-price"
              inputRef={register({
                required: "Required"
              })}
              style={{
                backgroundColor: "transparent",
                fontFamily: "Poppins"
              }}
            />
            <FormHelperText id="my-helper-price">
              {errors.price && errors.price.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel htmlFor="address">Address Event</InputLabel>
            <Input
              id="address"
              placeholder="Address Events"
              name="address"
              aria-describedby="my-helper-address"
              inputRef={register({
                required: "Required"
              })}
              style={{
                backgroundColor: "transparent",
                fontFamily: "Poppins"
              }}
            />
            <FormHelperText id="my-helper-address">
              {errors.address && errors.address.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel htmlFor="url">Url Map</InputLabel>
            <Input
              id="url"
              placeholder="Url Map"
              name="urlMap"
              aria-describedby="my-helper-url"
              inputRef={register({
                required: "Required"
              })}
              style={{
                backgroundColor: "transparent",
                fontFamily: "Poppins"
              }}
            />
            <FormHelperText id="my-helper-url">
              {errors.urlMap && errors.urlMap.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <textarea
              name="description"
              ref={register({
                required: "required"
              })}
              style={{
                fontSize: "17px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                borderBottom: "2px solid rgb(103, 83, 83)",
                color: "rgb(103, 83, 83)",
                padding: "10px 0",
                WebkitAppearance: "none",
                resize: "none",
                fontFamily: "Poppins",
                height: "20px"
              }}
              placeholder="Description Event"
            />
            <FormHelperText id="my-helper-url">
              {errors.description && errors.description.message}
            </FormHelperText>
          </FormControl>

          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
              style={{
                boxShadow: "none",
                fontFamily: "Poppins"
              }}
            >
              Add Event
            </Button>
          </div>
        </form>
      </Container>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    addEvent: state.addEvent
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCategories: () => {
      dispatch(getCategories());
    },
    addEvent: data => {
      dispatch(addEvent(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
