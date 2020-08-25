import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import Switch from "@material-ui/core/Switch";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Jumbotron from "../components/Jumbotron";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
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
  // Container,
  MenuItem,
  FormControlLabel,
} from "@material-ui/core/";
import "./drive.css";
import moment from "moment";

function Drive({ isEdit, tripData }) {
  // Setting our component's initial state
  console.log("isEditMode =", isEdit, "tripData = ", tripData);
  const [trip, setTrip] = useState({ tripData });
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
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      demo: {
        backgroundColor: theme.palette.background.paper,
      },
      "& > svg": {
        margin: theme.spacing(2),
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(2),
        marginLeft: theme.spacing(5),
        width: "80%",
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
  }));
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState("ride");

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

  function handleCarryPackageChange(e) {
    const checked = e.target.checked;
    console.log("carryPackage checked:", checked);
    setCarryPackage(checked); // sets DOM checkbox
    setFormObject({ ...formObject, carryPackage: checked }); // sets formObject
  }

  // When the form is submitted, use the API.saveTrip method to save the trip data
  // Then reload trips from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("FormObject carryPackage= ", formObject.carryPackage);
    // if (formObject.from && formObject.to) {
    // From: and To: fields are mandatory.
    API.saveTrip({
      from: formObject.from,
      to: formObject.to,
      departTime: formObject.time,
      departDate: formObject.date,
      freeSeats: formObject.freeSeats,
      carryPackage: formObject.carryPackage,
      tripNote: formObject.tripNote,
    })

      .then(() => alert("Trip has been saved"))
      .catch((err) => console.log(err));
  }

  // Handle edit trip details
  function handleEditedFormSubmit(event) {
    event.preventDefault();
    alert("Processing Updated trip details..."); // TODO use Modal instead of alert

    console.log("Trip[0] = ", trip[0], "formObject = ", formObject);
    API.updateTrip(trip[0]._id, {
      from: formObject.from || trip[0].from,
      to: formObject.to || trip[0].to,
      departTime: formObject.time || trip[0].departTime,
      departDate: formObject.date || trip[0].departDate,
      carryPackage: formObject.hasPackage || carryPackage, // not a property of trip[0]
      tripNote: formObject.tripNote || trip[0].tripNote,
      freeSeats: formObject.freeSeats || trip[0].freeSeats,
    })
      .then(function () {
        alert(JSON.stringify("Updated trip details sent..."));
        window.location.reload(); //refresh page to get updated request
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
                  <h1>
                    Drive
                    <LocalTaxiIcon fontSize="large" />
                  </h1>
                </Jumbotron>
              )}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <form className={classes.root}>
                  <Grid item>
                    <TextField
                      id="from"
                      select
                      label="From (required)"
                      defaultValue={tripData ? tripData.from : ""}
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
                      defaultValue={tripData ? tripData.to : ""}
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
                      defaultValue={
                        tripData
                          ? moment(tripData.departDate).format("yyyy-MM-DD") // needs correct date format
                          : moment(new Date(Date.now())).format("yyyy-MM-DD") // show current  date by default
                      }
                      variant="outlined"
                      onChange={handleInputChange}
                      helperText="Date you'll be leaving..."
                      InputLabelProps={
                        {
                          // removes the header from inside the input box
                        }
                      }
                    />
                  </Grid>
                  <TextField
                    id="departTime"
                    label="Start Time"
                    defaultValue={
                      tripData
                        ? tripData.departTime
                        : moment(new Date(Date.now())).format("HH:mm") // requires correct time format, display current time
                    }
                    variant="outlined"
                    onChange={handleInputChange}
                    type="time"
                    name="time"
                    helperText="Time you'll be leaving..."
                    InputLabelProps={
                      {
                        // removes the header from inside the input box
                      }
                    }
                  />

                  <Grid item>
                    <TextField
                      id="outlined-basic"
                      label="Free Seats?"
                      variant="outlined"
                      onChange={handleInputChange}
                      type="number"
                      defaultValue={tripData ? tripData.freeSeats : 1}
                      name="freeSeats"
                      helperText="Number of seats available..."
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
                    justify="center"
                    alignItems="center"
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={carryPackage}
                          onChange={handleCarryPackageChange}
                          name="carryPackage"
                        />
                      }
                      label="Carry a package?"
                    ></FormControlLabel>
                    <LocalMallIcon color="primary" />
                  </Grid>

                  <Grid>
                    <TextField
                      id="tripNote"
                      label="Trip Note"
                      multiline
                      rows={2}
                      variant="outlined"
                      helperText="Enter note about your trip..."
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

export default Drive;
