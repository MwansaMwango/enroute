import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import Switch from "@material-ui/core/Switch";
import Jumbotron from "../components/Jumbotron";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
import API from "../utils/API";
import SimpleSlider from "../components/SimpleSlider";
import { Container, Col, Row } from "../components/Grid"; // removed container
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { FormBtn } from "../components/Form";
import {
  Box,
  Grid,
  TextField,
  // Container,
  MenuItem,
  FormControlLabel,
} from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import "./drive.css";
import moment from "moment";

function Drive({ isEdit, tripData }) {
  // Setting our component's initial state
  console.log("isEditMode =", isEdit, "tripData = ", tripData);
  const [trip] = useState(tripData);
  const [routes, setRoutes] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [carryPackage, setCarryPackage] = useState(
    tripData ? tripData.carryPackage : false
  );

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#FF9057",
        main: "#E64500",
        dark: "#022222",
        contrastText: "#fff",
      },
      secondary: {
        light: "#78849E",
        main: "#259CBB",
        dark: "#168387",
        contrastText: "#000",
      },
    },
    typography: {
      fontFamily: [
        "Oswald",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });
  console.log("Typography", theme.typography);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > svg": {
        margin: theme.spacing(1),
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
      "& .MuiInputBase-root": {
        borderRadius: 20,
      },

      container: {
        display: "flex",
        flexWrap: "wrap",
        maxHeight: "90vh",
      },
    },
    textField: {
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),

      maxWidth: "50vw",
    },
  }));
  const classes = useStyles();

  let uniqueRouteList = [];

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadRoutes();
  }, []);

  function loadRoutes() {
    let routeList = [];

    API.getRoutes()
      .then(function (res) {
        res.data.map((route) => {
          routeList.push(route.from, route.to);
        });
        uniqueRouteList = [...new Set(routeList)]; // removes duplicate elements in array
        setRoutes(uniqueRouteList);
      })
      .catch((err) => console.log(err));
  }
  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleCarryPackageChange(event) {
    const checked = event.target.checked;
    console.log("carryPackage checked:", checked);
    setCarryPackage(checked); // sets DOM checkbox
    setFormObject({ ...formObject, carryPackage: checked }); // sets formObject
  }

  // When the form is submitted, use the API.saveTrip method to save the trip data

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("FormObject carryPackage= ", formObject.carryPackage);
    // if (formObject.from && formObject.to) {
    // From: and To: fields are mandatory.
    let submittedTripObj = {
      from: formObject.from,
      to: formObject.to,
      // departTime: formObject.time,
      // departDate: formObject.date,
      departTime:
        moment(formObject.time).format("HH:mm") ||
        moment(new Date(Date.now())).format("HH:mm"),
      departDate:
        moment(formObject.date).format("yyyy-MM-DD") ||
        moment(new Date(Date.now())).format("yyyy-MM-DD"),
      freeSeats: formObject.freeSeats || 1,
      carryPackage: formObject.carryPackage || false,
      tripNote: formObject.tripNote || "",
    };

    console.log("Submitted Object= ", submittedTripObj);

    API.saveTrip(submittedTripObj)
      .then(() => alert(JSON.stringify("Trip has been saved")))
      .catch((err) => console.log(err));
  }

  // Handle edit trip details
  function handleEditedFormSubmit(event) {
    event.preventDefault();
    alert("Processing Updated trip details..."); // TODO use Modal instead of alert

    console.log("Trip = ", trip, "formObject note = ", formObject);
    let updatedTripData = {
      from: formObject.from || trip.from,
      to: formObject.to || trip.to,
      departTime: moment(formObject.time).format("HH:mm") || trip.departTime,
      departDate:
        moment(formObject.date).format("yyyy-MM-DD") || trip.departDate,
      carryPackage: formObject.hasPackage || carryPackage, // not a property of tripData
      tripNote: formObject.tripNote || trip.tripNote,
      freeSeats: formObject.freeSeats || trip.freeSeats,
    };
    console.log("updatedTripData obj= ", updatedTripData);
    API.updateTrip(trip._id, updatedTripData)
      .then(function (res) {
        alert(JSON.stringify("Updated trip details sent...", res.data));
        window.location.reload(); //refresh page to get updated request...TODO close modals
      })
      .catch((err) => console.log(err));
  }

  return (
    <Box
      style={{
        paddingBottom: "50px", // required for bottom navigation
      }}
    >
      <Container fluid maxWidth="100vw">
        <ThemeProvider theme={theme}>
          {isEdit ? null : (
            <Jumbotron>
              <Typography variant="h4" component="h4" color="primary">
                Drive
                <LocalTaxiIcon fontSize="large" />
              </Typography>
            </Jumbotron>
          )}
          <form className={classes.root}>
            <div>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <TextField
                  id="from"
                  select
                  label="From (required)"
                  defaultValue={tripData ? tripData.from : ""}
                  onChange={handleInputChange}
                  name="from"
                  // helperText="Start location"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <MyLocationIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  style={{ width: "90vw" }}
                >
                  {routes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <TextField
                  id="to"
                  select
                  label="To (required)"
                  defaultValue={tripData ? tripData.to : ""}
                  onChange={handleInputChange}
                  name="to"
                  // helperText="Please select your end location"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <LocationOnIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  style={{ width: "90vw" }}
                >
                  {routes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </div>
            <div>
              <Grid
                container
                direction="row"
                justify="space-around" // required due to textfield maxwidth = 50vw
                alignItems="center"
              >
                <TextField
                  id="departDate"
                  type="date"
                  name="date"
                  label="Start Date"
                  className={classes.textField}
                  defaultValue={
                    tripData
                      ? moment(tripData.departDate).format("yyyy-MM-DD") // needs correct date format
                      : // ? tripData.departDate // needs correct date format
                        moment(new Date(Date.now())).format("yyyy-MM-DD") // show current  date by default
                  }
                  variant="outlined"
                  onChange={handleInputChange}
                  // helperText="Date you'll be leaving..."
                  InputLabelProps={
                    {
                      // removes the header from inside the input box
                    }
                  }
                />

                <TextField
                  id="departTime"
                  type="time"
                  name="time"
                  label="Start Time"
                  defaultValue={
                    tripData
                      ? tripData.departTime // requires correct time format, display current time
                      : moment(new Date(Date.now())).format("HH:mm") // requires correct time format, display current time
                  }
                  variant="outlined"
                  onChange={handleInputChange}
                  // helperText="Time you'll be leaving..."
                  InputLabelProps={
                    {
                      // removes the header from inside the input box
                    }
                  }
                />
              </Grid>
            </div>

            <div>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <TextField
                  id="outlined-basic"
                  label="Free Seats?"
                  variant="outlined"
                  onChange={handleInputChange}
                  type="number"
                  className={classes.textField}
                  defaultValue={tripData ? tripData.freeSeats : 1}
                  name="freeSeats"
                  // helperText="Number of seats available..."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <AirlineSeatReclineNormalIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <span>
                  <LocalMallIcon color="primary" />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={carryPackage}
                        onChange={handleCarryPackageChange}
                        name="carryPackage"
                      />
                    }
                    labelPlacement="top"
                    label="Package?"
                  ></FormControlLabel>
                </span>
              </Grid>
            </div>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <TextField
                id="tripNote"
                name="tripNote"
                label="Trip Note"
                multiline
                // rows={2}
                defaultValue={tripData ? tripData.tripNote : ""}
                onChange={handleInputChange}
                variant="outlined"
                style={{ width: "90vw" }}
                // helperText="Enter note about your trip..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <SpeakerNotesIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <FormBtn
                // enable form submit if to/from is filled or in edit mode
                disabled={!((formObject.from && formObject.to) || tripData)}
                onClick={isEdit ? handleEditedFormSubmit : handleFormSubmit}
              >
                {isEdit ? "Update Trip" : "Post Trip"}
              </FormBtn>
            </Grid>

            <div
              style={{
                position: "fixed",
                left: "0",
                bottom: "0",
                width: "100%",
                height: "50px",
                textAlign: "center",
              }}
            >
              {isEdit ? null : <SimpleBottomNavigation />}
            </div>
          </form>
        </ThemeProvider>
      </Container>
    </Box>
  );
}

export default Drive;
