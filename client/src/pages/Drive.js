import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import EventIcon from "@material-ui/icons/Event";
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
  CssBaseline,
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
import MyResponsiveBar from "../components/MyResponsiveBar";
import CustomizedBadges from "../components/CustomizedBadges";
import Image from "material-ui-image";

import "fontsource-montserrat/500.css";

function Drive({ isEdit, tripData }) {
  // Setting our component's initial state
  console.log("isEditMode =", isEdit, "tripData = ", tripData);
  const [trip] = useState(tripData);
  const [routes, setRoutes] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [counts, setCountsObject] = useState({}); // stores count of ride requests for each location
  const [carryPackage, setCarryPackage] = useState(
    tripData ? tripData.carryPackage : false
  );

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#FF9057",
        main: "#E64500",
        dark: "#259CBB",
        contrastText: "#fff",
      },
      secondary: {
        light: "#78849E",
        main: "#259CBB",
        dark: "#168387",
        contrastText: "#000",
      },
      // type: 'dark', // dark theme
      typography: {
        fontFamily: "Montserrat",
      },
      // overrides: {
      //   MuiCssBaseline: {
      //     '@global': {
      //       '@font-face': ['Montserrat'],
      //     },
      //   },
      // },
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > svg": {
        margin: theme.spacing(1),
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: "100%",
      },
      "& .MuiInputBase-root ": {
        borderRadius: "20px",
        backgroundColor: "white",
        opacity: "90%",
        filter: "drop-shadow(3px 3px 3px rgba(240,100,0.3))",
        fontFamily: "Montserrat",
        // fontWeight: "medium",
        fontSize: "1rem",
      },
      "& .MuiSelect-root ": {
        fontSize: "1.2rem",
      },
      "& .MuiFormControlLabel-label": {
        // color: "#fff", // for dark theme
        opacity: "90%",
        // filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))",
        // filter: "drop-shadow(3px 3px 3px rgba(240,100,0.3))",
      },

      container: {
        display: "flex",
        flexWrap: "wrap",
      },
    },
    textField: {
      maxWidth: "50%",
    },
    typography: {
      fontFamily: "Montserrat",
    },

    locationTxt: { transform: "rotateZ(-45deg)" },
    mapWrapper: {
      position: "relative",
      width: "100%",
      display: "inline-block" /* Make the width of box same as image */,
      fontSize: "3.5vw",
      textAlign: "center",
    },
    img: {
      width: "90%",
      paddingTop: "10%", // allows for location texts
      // paddingBottom: "0%", // allows for location texts
    },
    positionToday: {
      // fontSize: "1.2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // aligns with icon
      // top: "-4%" /* Adjust this value to move the positioned div up and down */,
    },
    positionNED: {
      position: "absolute",

      left: "10%", // Horizontal adjstment

      top: "4%" /* Adjust this value to move the positioned div up and down */,
    },
    positionPER: {
      position: "absolute",

      left: "25%", // Horizontal adjstment

      top: "4%" /* Adjust this value to move the positioned div up and down */,
    },
    positionVIC: {
      position: "absolute",

      left: "40%",

      top: "4%" /* Adjust this value to move the positioned div up and down */,
    },
    positionBMT: {
      position: "absolute",

      left: "52%",

      top: "30%" /* Adjust this value to move the positioned div up and down */,
    },

    positionMTY: {
      position: "absolute",

      left: "65%",

      top: "30%" /* Adjust this value to move the positioned div up and down */,
    },
    positionSTR: {
      position: "absolute",

      left: "75%",

      top: "4%" /* Adjust this value to move the positioned div up and down */,
    },
    positionJND: {
      position: "absolute",

      left: "85%",

      top: "4%" /* Adjust this value to move the positioned div up and down */,
    },
  }));

  const classes = useStyles();

  let uniqueRouteList = [];

  // TODO Initialise and Load Requests from database, to be displayed on map
  useEffect(() => {
    loadTodaysRequests();
    loadRoutes();
  }, []);

  function loadTodaysRequests() {
    let todaysRequestsList = [];

    API.getTodaysRequests()
      .then(function (res) {
        res.data.map((request) => {
          todaysRequestsList.push(request.from);
        });
        countOccurrences(todaysRequestsList);
        console.log("Todays requets", todaysRequestsList);
        console.log("Counts = ", counts);
      })
      .catch((err) => console.log(err));
  }

  // counts number of ride requests from each location
  function countOccurrences(arr) {
    for (let i = 0; i < arr.length; i++) {
      let num = arr[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    setCountsObject(counts);
  }

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
        paddingBottom: "20%", // ensures content is not hidden by footer
      }}
    >
      <Container fluid maxWidth="100vw">
        <ThemeProvider theme={theme}>
          <Row>
            <Col size="md-12">
              {isEdit ? null : (
                <Jumbotron>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Typography
                      variant="h5"
                      color={theme.palette.primary.light}
                    >
                      <LocalTaxiIcon fontSize="1rem" />
                      Drive
                    </Typography>
                  </Grid>
                </Jumbotron>
              )}

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Typography
                  variant="overline"
                  component="h6"
                  color="primary"
                  className={classes.positionToday}
                >
                  Riders Today
                  <EventIcon fontSize="small" />
                  <b>{moment().format("Do MMM YY")}</b>
                </Typography>

                {/* Render map */}

                <div className={classes.mapWrapper}>
                  <img
                    src={require("../assets/route-map.svg")}
                    alt="Loading map..."
                    className={classes.img}
                  />

                  {Object.keys(counts).map((key, index) => {
                    switch (key) {
                      case "Nedlands":
                        console.log(key);
                        return (
                          <div className={classes.positionNED} key={index}>
                            <CustomizedBadges
                              fromLocation="NED"
                              totalRequests={counts[key]}
                            />
                          </div>
                        );
                      case "Perth":
                        console.log(key);
                        return (
                          <div className={classes.positionPER} key={index}>
                            <CustomizedBadges
                              fromLocation="PER"
                              totalRequests={counts[key]}
                            />
                          </div>
                        );
                      case "Victoria Park":
                        return (
                          <div item className={classes.positionVIC} key={index}>
                            <CustomizedBadges
                              fromLocation="VIC"
                              totalRequests={counts[key]}
                            />
                          </div>
                        );
                      case "Belmont":
                        return (
                          <div className={classes.positionBMT} key={index}>
                            <CustomizedBadges
                              fromLocation="BMT"
                              totalRequests={counts[key]}
                            />
                          </div>
                        );
                      case "Mount Lawley":
                        return (
                          <div className={classes.positionMTY} key={index}>
                            <CustomizedBadges
                              fromLocation="MTY"
                              totalRequests={counts[key]}
                            />
                          </div>
                        );
                      case "Stirling":
                        console.log("Stirling count=", counts[key]);
                        return (
                          <div className={classes.positionSTR} key={index}>
                            <CustomizedBadges
                              fromLocation="STR"
                              totalRequests={counts[key]}
                            />
                          </div>
                        );
                      case "Joondalup":
                        return (
                          <div className={classes.positionJND} key={index}>
                            <CustomizedBadges
                              fromLocation="JND"
                              totalRequests={counts[key]}
                            />
                          </div>
                        );
                      default:
                        return null;
                    } // switch end
                  })}
                </div>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <form className={classes.root}>
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
                      // helperText="Required"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MyLocationIcon color="primary" />
                          </InputAdornment>
                        ),
                        shrink: true,
                      }}
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
                      // helperText="Required"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon color="primary" />
                          </InputAdornment>
                        ),
                        shrink: true,
                      }}
                      // style={{ maxWidth: "90vw", minWidth: "90%"}}
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
                    justify="space-between" // required due to textfield maxwidth = 40%
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
                          ? moment(tripData.departDate).format("yyyy/MM/DD") // needs correct date format
                          : moment(new Date(Date.now())).format("yy-MM-DD") // show current  date by default
                      }
                      variant="outlined"
                      onChange={handleInputChange}
                      // helperText="Date you'll be leaving..."
                      InputLabelProps={{
                        // removes the header from inside the input box
                        shrink: true,
                      }}
                    />

                    <TextField
                      id="departTime"
                      type="time"
                      name="time"
                      label="Start Time"
                      // className={classes.textField}
                      style={{ maxWidth: "30%" }}
                      defaultValue={
                        tripData
                          ? tripData.departTime // requires correct time format, display current time
                          : moment(new Date(Date.now())).format("HH:mm") // requires correct time format, display current time
                      }
                      variant="outlined"
                      onChange={handleInputChange}
                      // helperText="Time you'll be leaving..."
                      InputLabelProps={{
                        // removes the header from inside the input box
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <TextField
                      id="freeSeats"
                      label="Free Seats?"
                      variant="outlined"
                      onChange={handleInputChange}
                      type="number"
                      className={classes.textField}
                      // style={{ width: "30vw" }}
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
                        label="Parcel?"
                      ></FormControlLabel>
                    </span>
                  </Grid>

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
                      // style={{ width: "90vw" }}
                      // helperText="Enter note about your trip..."
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <SpeakerNotesIcon color="primary" />
                          </InputAdornment>
                        ),
                        shrink: true,
                      }}
                      style={{ marginBottom: "1rem" }}
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
                      disabled={
                        !((formObject.from && formObject.to) || tripData)
                      }
                      onClick={
                        isEdit ? handleEditedFormSubmit : handleFormSubmit
                      }
                    >
                      {isEdit ? "Update Trip" : "Post Trip"}
                    </FormBtn>
                  </Grid>

                  {isEdit ? null : <SimpleBottomNavigation />}
                </form>
              </Grid>
            </Col>
          </Row>
        </ThemeProvider>
      </Container>
    </Box>
  );
}

export default Drive;
