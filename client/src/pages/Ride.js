import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import EventIcon from "@material-ui/icons/Event";
import Switch from "@material-ui/core/Switch";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
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
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import "./drive.css";
import moment from "moment";
import CustomizedBadges from "../components/CustomizedBadges";
import AlertDialog from "../components/AlertDialog";
import { ReactComponent as DriveLogo } from "../assets/steering-wheel.svg";

function Ride({ isEdit, requestData }) {
  // set default value for requestData to empty object {}
  // Setting our component's initial state

  const [trip, setTrip] = useState([]);
  const [request, setRequest] = useState(requestData);
  const [matches, setMatches] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [formObject, setFormObject] = useState({});
  // set hasPackage & isTransportVehicle checkboxes to state of requestData in editMode else 'false' in normal mode
  const [counts, setCountsObject] = useState({}); // stores count of ride requests for each location
  const [hasPackage, setHasPackage] = useState(
    requestData ? requestData.hasPackage : false
  );
  const [isTransportVehicle, setIsTransportVehicle] = useState(
    requestData ? requestData.isTransportVehicle : false
  );
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [savedRequest, setSavedRequest] = useState({});

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
      typography: {
        fontFamily: "Montserrat",
      },
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
        fontSize: "1rem",
        // fontWeight: "medium",
      },

      "& .MuiSelect-root ": {
        fontSize: "1.2rem", // enlarges to and from fields
      },
      "& .MuiFormControlLabel-label": {
        opacity: "90%",
        fontFamily: "Montserrat",
        // color: "#fff", // for dark theme
        // filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))",
        // filter: "drop-shadow(3px 3px 3px rgba(240,100,0.3))",
      },
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      maxWidth: "50%",
    },

    // Map Section
    locationTxt: { transform: "rotateZ(-45deg)" },
    mapWrapper: {
      position: "relative",
      maxWidth: "100%",
      height: "30%",
      display: "inline-block" /* Make the width of box same as image */,
      fontSize: "3.5vw",
      textAlign: "center",
    },
    img: {
      width: "90%",
      paddingTop: "10%", // allows for location texts
    },
    positionToday: {
      // Display Todays Date
      fontSize: "1.1rem",
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

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadTodaysTrips();
    loadRoutes();
  }, []);

  // TODO Loads relevant trips with status !== 'complete' and sets them to trips
  function loadTodaysTrips() {
    let todaysTripList = [];

    API.getTodaysTrips()
      .then(function (res) {
        res.data.map((trip) => {
          todaysTripList.push(trip.from);
        });
        countOccurrences(todaysTripList);
        console.log("Todays Trips", todaysTripList);
        console.log("Counts = ", counts);
      })
      .catch((err) => console.log(err));
  }

  // counts number of driver trips from each location
  function countOccurrences(arr) {
    for (let i = 0; i < arr.length; i++) {
      let num = arr[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    setCountsObject(counts);
  }

  // TODO Loads relevant Requests with status = 'complete' and sets them to requests

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

  // Deletes a trip from the database with a given id, then reloads trips from the db

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    console.log("event=", event.target.value);
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

  function handleOpenAlertDialog() {
    setAlertDialogOpen(true);
  }

  function handleCloseAlertDialog() {
    setAlertDialogOpen(false);
    window.location.href = "/myrequests/"; // goto my requests
  }

  // When the form is submitted, use the API.requestRide method to save the trip data
  // Then check matching trips from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    // alert("Processing request..."); // TODO use Modal instead of alert

    // if (formObject.from && formObject.to) {
    // From: and To: fields are mandatory.
    let submittedRequestObj = {
      from: formObject.from,
      to: formObject.to,
      departTime:
        moment(formObject.time).format("HH:mm") ||
        moment(new Date(Date.now())).format("HH:mm"),
      departDate:
        moment(formObject.date).format("yyyy-MM-DD") ||
        moment(new Date(Date.now())).format("yyyy-MM-DD"),
      isTransportVehicle: formObject.isTransportVehicle || false,
      hasPackage: formObject.hasPackage || false,
      requestNote: formObject.requestNote || "",
      seatsRequired: formObject.seatsRequired || 1,
    };

    console.log("Submitted Object= ", submittedRequestObj);

    API.requestRide(submittedRequestObj)
      .then((res) => {
        let responseData = res.data;
        setSavedRequest(responseData);
        console.log("Saved Request Response", savedRequest._id);
      })
      .then(function () {
        checkMatchingTrips(submittedRequestObj);
        handleOpenAlertDialog();
      })
      .catch((err) => console.log(err));
  }
  // When the form is submitted, use the API.requestRide method to save the ride request data
  // check matching trips from database
  function handleEditedFormSubmit(event) {
    event.preventDefault();
    // alert("Processing Updated ride details..."); // TODO use Modal instead of alert
    let submittedEditedRequestObj = {
      from: formObject.from || request.from,
      to: formObject.to || request.to,
      departTime: formObject.time || request.departTime,
      departDate: formObject.date // check required due to default value reverting to today's date
        ? moment(formObject.date).format("yyyy-MM-DD")
        : moment(request.departDate).format("yyyy-MM-DD"),
      // departTime: moment(formObject.time).format("HH:mm") || moment(request.departTime).format("HH:mm"),

      // moment(formObject?.date).format("yyyy-MM-DD") || moment(request.departDate).format("yyyy-MM-DD") ,
      isTransportVehicle: formObject.isTransportVehicle || isTransportVehicle, // not a property of request
      hasPackage: formObject.hasPackage || request.hasPackage, // not a property of request
      requestNote: formObject.requestNote || request.requestNote,
      seatsRequired: formObject.seatsRequired || request.seatsRequired,
    };
    console.log("Request = ", request, "formObject = ", formObject);
    console.log("Edited submitted request obj = ", submittedEditedRequestObj);

    API.updateRequest(request._id, submittedEditedRequestObj)
      .then(function () {
        // alert(JSON.stringify("Updated Request details sent..."));
        checkMatchingTrips(submittedEditedRequestObj);
      })
      .then(function () {
        window.location.reload(); //refresh page to get updated request
      })
      .catch((err) => console.log(err));
  }

  function checkMatchingTrips(requestObjtoMatch) {
    API.findMatchingTrips(requestObjtoMatch)
      .then(function (res) {
        let responseData = res.data.length; // get number of elements in array
        setMatches(responseData);
      })
      .catch((err) => console.log(err));
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          paddingBottom: "90px",
        }}
      >
        <Container fluid maxWidth="100vw">
          <Row>
            <Col size="md-12">
              {alertDialogOpen ? (
                <AlertDialog
                  dialogOpen={true}
                  btnOpenTxt="Post Ride Request"
                  dialogTitle="Ride request sent..."
                  dialogContentTxt=" Matching driver(s) found. You'll be notified when a driver accepts."
                  dialogContentTxtMatches={matches}
                  btnOKTxt="OK"
                  handleClose={handleCloseAlertDialog}
                />
              ) : null}

              {isEdit ? null : (
                <div>
                  <Jumbotron>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <EmojiPeopleRoundedIcon fontSize="large" />
                      <Typography variant="outline" component="h3">
                        Ride - New Request
                      </Typography>
                    </Grid>
                  </Jumbotron>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Typography
                        variant="overline"
                        component="h5"
                        color="primary"
                        className={classes.positionToday}
                      >
                        Drivers Today
                        <EventIcon fontSize="small" />
                        <b>{moment().format("Do MMM YY")}</b>
                      </Typography>
                    </Grid>

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
                              <div
                                item
                                className={classes.positionVIC}
                                key={index}
                              >
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
                          case "Mt. Lawley":
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
                </div>
              )}
              {/* end of non-edit mode */}

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
                      defaultValue={requestData ? requestData.from : ""}
                      onChange={handleInputChange}
                      name="from"
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
                      defaultValue={requestData ? requestData.to : ""}
                      onChange={handleInputChange}
                      name="to"
                      // helperText="Please select your end location"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon color="primary" />
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
                        requestData
                          ? moment(requestData.departDate).format("yyyy-MM-DD") // needs correct date format
                          : moment().format("yyyy-MM-DD") // show current  date by default
                      }
                      variant="outlined"
                      onChange={handleInputChange}
                      InputLabelProps={{
                        // removes the header from inside the input box
                        shrink: true,
                      }}
                    />

                    <TextField
                      id="departTime"
                      name="time"
                      type="time"
                      label="Start Time"
                      style={{ maxWidth: "30%" }}
                      variant="outlined"
                      defaultValue={
                        requestData
                          ? requestData.departTime
                          : moment().format("HH:mm") // requires correct time format, display current time
                      }
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
                    justify="center"
                    alignItems="center"
                  >
                    <TextField
                      id="seatsRequired"
                      label="Seats required?"
                      variant="outlined"
                      // className={classes.textField}
                      // style={{ maxWidth: "50%" }}
                      defaultValue={requestData ? requestData.seatsRequired : 1}
                      onChange={handleInputChange}
                      type="number"
                      name="seatsRequired"
                      // helperText="Number of seats required..."
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <AirlineSeatReclineNormalIcon color="primary" />
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
                    <div>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <LocalMallIcon color="primary" />

                        <FormControlLabel
                          control={
                            <Switch
                              checked={hasPackage}
                              onChange={handleHasPackageChange}
                              name="hasPackage"
                            />
                          }
                          label="Parcel?"
                        />
                      </Grid>
                    </div>

                    <div>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <DriveLogo
                          name="driveLogo"
                          width="1.8rem"
                          fill="#E64500"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isTransportVehicle}
                              onChange={handleIsTransportVehicleChange}
                              name="isTransportVehicle"
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
                          }
                          label="Drive vehicle"
                        />
                      </Grid>
                    </div>
                    {/* </div> */}
                  </Grid>
                  {/* </Grid> */}

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <TextField
                      id="requestNote"
                      label="Request Note"
                      defaultValue={requestData ? requestData.requestNote : ""}
                      name="requestNote"
                      multiline
                      // rows={2}
                      onChange={handleInputChange}
                      variant="outlined"
                      // helperText="Enter other details of your request..."
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
                        !((formObject.from && formObject.to) || requestData)
                      }
                      onClick={
                        isEdit ? handleEditedFormSubmit : handleFormSubmit
                      }
                    >
                      {isEdit ? "Update Ride" : "Request Ride"}
                    </FormBtn>
                  </Grid>
                  {isEdit ? null : <SimpleBottomNavigation />}
                </form>
              </Grid>
            </Col>
          </Row>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Ride;
