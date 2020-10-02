import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
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
import MyResponsiveBar from "../components/MyResponsiveBar";
import CustomizedBadges from "../components/CustomizedBadges";
import Image from "material-ui-image";
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
      // type: 'dark', // dark theme
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
      "& .MuiInputBase-root": {
        borderRadius: 20,
      },
      "& .MuiFormControlLabel-label": {
        // color: "#fff", // for dark theme
      },

      container: {
        display: "flex",
        flexWrap: "wrap",
      },
    },
    textField: {
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),

      maxWidth: "50%",
    },
    locationTxt: { transform: "rotateZ(-45deg)" },
    mapWrapper: {
      position: "relative",
      width: "100%",
      display: "inline-block" /* Make the width of box same as image */,
      fontSize: "3.5vw",
    },
    img: {
      // position: "relative",
      width: "100%",
      paddingBottom: "10%", // allows for location texts
      paddingTop: "10%", // allows for location texts
    },
    positionNED: {
      position: "absolute",
      // z-index: 999;
      margin: "0 auto",
      left: "-65%", // Horizontal adjstment
      right: 0,
      top: "0%" /* Adjust this value to move the positioned div up and down */,
      textAlign: "center",
      width: "100%" /* Set the width of the positioned div left and right*/,
    },
    positionPER: {
      position: "absolute",
      // z-index: 999;
      margin: "0 auto",
      left: "-30%", // Horizontal adjstment
      right: 0,
      top: "0%" /* Adjust this value to move the positioned div up and down */,
      textAlign: "center",
      width: "100%" /* Set the width of the positioned div left and right*/,
    },
    positionVIC: {
      position: "absolute",
      // z-index: 999;
      margin: "0 auto",
      left: 0,
      right: 0,
      top: "0%" /* Adjust this value to move the positioned div up and down */,
      textAlign: "center",
      width: "100%" /* Set the width of the positioned div left and right*/,
    },
    positionBMT: {
      position: "absolute",
      // z-index: 999;
      margin: "0 auto",
      left: "15%",
      right: 0,
      top: "20%" /* Adjust this value to move the positioned div up and down */,
      textAlign: "center",
      width: "100%" /* Set the width of the positioned div left and right*/,
    },

    positionMTY: {
      position: "absolute",
      // z-index: 999;
      margin: "0 auto",
      left: "30%",
      right: 0,
      top: "20%" /* Adjust this value to move the positioned div up and down */,
      textAlign: "center",
      width: "100%" /* Set the width of the positioned div left and right*/,
    },
    positionSTR: {
      position: "absolute",
      // z-index: 999;
      margin: "0 auto",
      left: "40%",
      right: 0,
      top: "0%" /* Adjust this value to move the positioned div up and down */,
      textAlign: "center",
      width: "100%" /* Set the width of the positioned div left and right*/,
    },
    positionJND: {
      position: "absolute",
      // z-index: 999;
      margin: "0 auto",
      left: "50%",
      right: 0,
      top: "0%" /* Adjust this value to move the positioned div up and down */,
      textAlign: "center",
      width: "100%" /* Set the width of the positioned div left and right*/,
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
        paddingBottom: "50px",
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
                    <Typography variant="h5" component="h5" color="primary">
                      Drive
                      <LocalTaxiIcon fontSize="small" />
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
                <Col size="md-12">
                  <div className={classes.mapWrapper}>
                    <img
                      src={require("../assets/route-map.svg")}
                      alt=""
                      className={classes.img}
                    />
                    <div className={classes.positionNED}>
                      <CustomizedBadges fromLocation="NED" totalRequests={1} />
                    </div>
                    <div className={classes.positionPER}>
                      <CustomizedBadges fromLocation="PER" totalRequests={2} />
                    </div>
                    <div className={classes.positionVIC}>
                      <CustomizedBadges fromLocation="VIC" totalRequests={3} />
                    </div>
                    <div className={classes.positionBMT}>
                      <CustomizedBadges fromLocation="BMT" totalRequests={4} />
                    </div>
                    <div className={classes.positionMTY}>
                      <CustomizedBadges fromLocation="MTY" totalRequests={5} />
                    </div>
                    <div className={classes.positionSTR}>
                      <CustomizedBadges fromLocation="STR" totalRequests={6} />
                    </div>
                    <div className={classes.positionJND}>
                      <CustomizedBadges fromLocation="JND" totalRequests={7} />
                    </div>
                  </div>
                </Col>
              </Grid>

              {/* <MyResponsiveBar /> */}

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
                      // helperText="Start location"
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
                  <span
                    style={{
                      borderLeft: "2px solid #E64500",
                      height: "45px",
                      position: "relative",
                      left: "10%",
                      top: 0,
                      zIndex: 100,
                    }}
                  ></span>

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
                      // style={{ maxWidth: "90vw", minWidth: "90%"}}
                    >
                      {routes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  {/* </div> */}

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
                  {/* </div>

                {/* <div> */}
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <TextField
                      id="outlined-basic"
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
                        label="Package?"
                      ></FormControlLabel>
                    </span>
                  </Grid>
                  {/* </div> */}

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

                  {/* <div
                    // container
                    // direction="row"
                    // justify="space-around"
                    // alignItems="center"
                  
                    style={{
                      position: "fixed",
                      left: "0",
                      bottom: "0",
                      width: "100%",
                      height: "50px",
                      textAlign: "center",
                    }}
                  > */}
                  {isEdit ? null : <SimpleBottomNavigation />}
                  {/* </div> */}
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
