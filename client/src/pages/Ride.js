import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import Switch from "@material-ui/core/Switch";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "../components/Grid"; // removed container
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import {
  InputWithIcon,
  BasicTextFields,
  TextArea,
  FormBtn,
} from "../components/Form";
import {
  Input,
  Box,
  Grid,
  TextField,
  // Container,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core/";

import "./drive.css";

function Ride({ isEdit, requestData }) { // set default value for requestData to empty object {}
  // Setting our component's initial state
  console.log("isModule =", isEdit, "requestData = ", requestData);
  const [trips, setTrip] = useState([]);
  const [request, setRequest] = useState([]);
  const [matches, setMatches] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [hasPackage, setHasPackage] = useState(false);
  const [isTransportVehicle, setIsTransportVehicle] = useState(false);

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
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > svg": {
        margin: theme.spacing(2),
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(2),
        marginLeft: theme.spacing(5),

        width: "80%",
        // marginTop: theme.spacing(1)
      },
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),
      margin: theme.spacing(2),

      maxWidth: "100%",
    },
    // marginTop: {
    //   marginTop: theme.spacing(5)
    // }
  }));
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  let uniqueRouteList = [];

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadTrips();
    loadRoutes();
  }, []);

  // TODO Loads recent Requests with status = 'complete' and sets them to trips
  function loadTrips() {
    API.getTrips()
      .then((res) => setTrip(res.data))
      .catch((err) => console.log(err));
  }

  // TODO Loads recent Requests with status = 'complete' and sets them to trips
  function loadRequestById(requestId) {
    API.getRequest(requestId)
      .then((res) => {
        setRequest(res.data);
        console.log("request by ID = ", res.data);
      })
      .catch((err) => console.log(err));
  }

  function loadRoutes() {
    let routeList = [];

    API.getRoutes()
      .then(function (res) {
        res.data.map((route) => {
          routeList.push(route.from, route.to);
          console.log("Response of getroutes=", route.from);
        });
        uniqueRouteList = [...new Set(routeList)]; // removes duplicate elements in array
        setRoutes(uniqueRouteList);
        console.log("Preset routes all  ", routeList);
        console.log("Preset routes unique  ", uniqueRouteList);
      })
      .catch((err) => console.log(err));
  }

  // Deletes a trip from the database with a given id, then reloads trips from the db
  function deleteTrip(id) {
    API.deleteTrip(id)
      .then((res) => loadTrips())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleHasPackageChange(e) {
    const checked = e.target.checked;
    console.log("hasPackage checked:", checked);
    setHasPackage(checked); // sets DOM checkbox
    setFormObject({ ...formObject, hasPackage: checked }); // sets formObject
  }

  function handleIsTransportVehicleChange(e) {
    const checked = e.target.checked;
    console.log("isTransportVehicle checked:", checked);
    setIsTransportVehicle(checked); // sets DOM checkbox
    setFormObject({ ...formObject, isTransportVehicle: checked }); // sets formObject
  }

  // When the form is submitted, use the API.requestRide method to save the trip data
  // Then check matching trips from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    alert("Processing request..."); // TODO use Modal instead of alert
    console.log("FormObject= ", formObject);
    // if (formObject.from && formObject.to) {
    // From: and To: fields are mandatory.
    API.requestRide({
      from: formObject.from,
      to: formObject.to,
      departTime: formObject.time,
      departDate: formObject.date,
      isTransportVehicle: formObject.isTransportVehicle,
      hasPackage: formObject.hasPackage,
      requestNote: formObject.requestNote,
      seatsRequired: formObject.seatsRequired,
      requestId: formObject.requestId,
    })
      .then(function (res) {
        alert(JSON.stringify("Request sent..."));
      })
      .then(function () {
        checkMatchingTrips();
      })
      .catch((err) => console.log(err));
  }
  // When the form is submitted, use the API.requestRide method to save the ride request data
  // check matching trips from database
  function handleEditedFormSubmit(event, requestId) {
    event.preventDefault();
    alert("Processing Updated ride request..."); // TODO use Modal instead of alert
    API.updateRequest(requestId, {
      from: formObject.from,
      to: formObject.to,
      departTime: formObject.time,
      departDate: formObject.date,
      isTransportVehicle: formObject.isTransportVehicle,
      hasPackage: formObject.hasPackage,
      requestNote: formObject.requestNote,
      seatsRequired: formObject.seatsRequired,
    })
      .then(function (res) {
        alert(JSON.stringify("Uodated Request sent..."));
      })
      .then(function () {
        checkMatchingTrips();
      })
      .catch((err) => console.log(err));
  }

  function checkMatchingTrips() {
    API.findMatchingTrips({
      from: formObject.from,
      to: formObject.to,
      departTime: formObject.time,
      departDate: formObject.date,
      carryPackage: formObject.hasPackage,
      freeSeats: formObject.seatsRequired,
      // user_id: req.user,
    })
      .then(function (res) {
        alert(
          res.data.length +
            " Matching trip(s) found. You will be notified once the driver confirms."
        );
        setMatches(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Box
      style={{
        paddingBottom: "50px",
      }}
    >
      <Container fluid maxWidth="100vw">
        <ThemeProvider theme={theme}>
          <Row>
            <Col size="md-12">
              <Jumbotron color={theme.palette.primary.main}>
                <h1>
                  Ride
                  <EmojiPeopleRoundedIcon fontSize="large" />
                </h1>
              </Jumbotron>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <form className={classes.root}>
                  <Grid item>
                    <TextField
                      className={classes.marginTop}
                      id="from"
                      select
                      label="From (required)"
                      defaultValue={requestData ? requestData.from : null}
                      onChange={handleInputChange}
                      name="from"
                      helperText="Start location"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment>
                            <MyLocationIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {routes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item>
                    <TextField
                      id="to"
                      select
                      label="To (required)"
                      defaultValue={requestData ? requestData.to : null}
                      onChange={handleInputChange}
                      name="to"
                      helperText="Please select your end location"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment>
                            <LocationOnIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {routes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item>
                    <TextField
                      id="departDate"
                      type="date"
                      name="date"
                      label="Start Date"
                      defaultValue={requestData ? requestData.departDate : null}
                      variant="outlined"
                      onChange={handleInputChange}
                      helperText="Date you'll be leaving..."
                      InputLabelProps={{
                        // removes the header from inside the input box
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <TextField
                    id="departTime"
                    label="Start Time"
                    variant="outlined"
                    defaultValue={requestData ? requestData.departTime : null}
                    onChange={handleInputChange}
                    type="time"
                    name="time"
                    helperText="Time you'll be leaving..."
                    InputLabelProps={{
                      // removes the header from inside the input box

                      shrink: true,
                    }}
                  />

                  <Grid item>
                    <TextField
                      id="seatsRequired"
                      label="Seats Required?"
                      variant="outlined"
                      defaultValue={requestData ? requestData.seatsRequired : null}
                      onChange={handleInputChange}
                      type="number"
                      name="seatsRequired"
                      helperText="Number of seats required..."
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <AirlineSeatReclineNormalIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      id="requestNote"
                      label="Request Note"
                      defaultValue={requestData ? requestData.requestNote : null}
                      name="requestNote"
                      multiline
                      rows={1}
                      variant="outlined"
                      helperText="Enter other details of your request..."
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <SpeakerNotesIcon color="primary" />
                          </InputAdornment>
                        ),
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={hasPackage}
                          defaultValue={requestData ? requestData.hasPackage : null}
                          onChange={handleHasPackageChange}
                          name="hasPackage"
                        />
                      }
                      label="Send a parcel?"
                    ></FormControlLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isTransportVehicle}
                          defaultValue={requestData ? requestData.isTransportVehicle : null}
                          onChange={handleIsTransportVehicleChange}
                          name="isTransportVehicle"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      }
                      label="Drive vehicle"
                    />
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                  >
                    {" "}
                    <FormBtn
                      disabled={!(formObject.from && formObject.to)}
                      onClick={isEdit? handleEditedFormSubmit : handleFormSubmit}
                    >
                      {isEdit? "Update Ride" : "Request Ride"}
                    </FormBtn>
                  </Grid>
                  <div
                    style={{
                      position: "fixed",
                      left: "0",
                      bottom: "0",
                      width: "90%",
                      height: "50px",
                      textAlign: "center",
                    }}
                  >
                    {isEdit ? null : <SimpleBottomNavigation />}
                  </div>
                </form>
              </Grid>
            </Col>
          </Row>
        </ThemeProvider>
      </Container>
    </Box>
  );
}

export default Ride;
