import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "../components/Grid"; // removed container
import { makeStyles } from "@material-ui/core/styles";
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

function Ride() {
  // Setting our component's initial state
  const [trips, setTrip] = useState([]);
  const [matches, setMatches] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [hasPackage, setHasPackage] = useState(false);
  const [isTransportVehicle, setIsTransportVehicle] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  const classes = useStyles();
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
  // Then reload trips from the database
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
      // user_id: req.user,
    })
      // .then((res) => loadTrips())
      .then(function (res) {
        alert(JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));

    API.findMatchingTrips({
      from: formObject.from,
      to: formObject.to,
      departTime: formObject.time,
      departDate: formObject.date,
      isTransportVehicle: formObject.isTransportVehicle,
      hasPackage: formObject.hasPackage,
      requestNote: formObject.requestNote,
      seatsRequired: formObject.seatsRequired,
      // user_id: req.user,
    })
      .then(function (res) {
        setMatches(res.data);
        alert(res.data.length + " Matches found.");
      })
      .catch((err) => console.log(err));
  }

  return (
    <Box>
      <Container fluid maxWidth="100vw">
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Ride</h1>
            </Jumbotron>
            <Grid container justify="center" alignItems="center">
              <form className={classes.root}>
                <TextField
                  id="from"
                  select
                  label="From (required)"
                  onChange={handleInputChange}
                  name="from"
                  helperText="Please select your start location"
                  variant="outlined"
                >
                  {routes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="to"
                  select
                  label="To (required)"
                  onChange={handleInputChange}
                  name="to"
                  helperText="Please select your end location"
                  variant="outlined"
                >
                  {routes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <br />

                <TextField
                  id="departDate"
                  type="date"
                  name="date"
                  label="Start Date"
                  variant="outlined"
                  onChange={handleInputChange}
                  helperText="Date you'll be leaving..."
                  InputLabelProps={{
                    // removes the header from inside the input box
                    shrink: true,
                  }}
                />

                <TextField
                  id="departTime"
                  label="Start Time"
                  variant="outlined"
                  onChange={handleInputChange}
                  type="time"
                  name="time"
                  helperText="Time you'll be leaving..."
                  InputLabelProps={{
                    // removes the header from inside the input box
                    shrink: true,
                  }}
                />
                <br />
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  item
                  xs={12}
                >
                  <TextField
                    id="outlined-basic"
                    label="Seats Required?"
                    variant="outlined"
                    onChange={handleInputChange}
                    type="number"
                    name="seatsRequired"
                    helperText="Number of seats required..."
                  />
                </Grid>
                <br />
                <Grid
                  xs={12}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <TextField
                    id="requestNote"
                    label="Request Note"
                    multiline
                    rows={4}
                    variant="outlined"
                    helperText="Enter other details of your request..."
                  />
                  {/* <TextArea
              onChange={handleInputChange}
              name="tripNote"
              helperText="Enter note about your trip..."
            /> */}
                  <br />
                </Grid>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  item
                  xs={12}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasPackage}
                        onChange={handleHasPackageChange}
                        name="hasPackage"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    }
                    label="Send a parcel?"
                  />
                </Grid>
                <br />
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  item
                  xs={12}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isTransportVehicle}
                        onChange={handleIsTransportVehicleChange}
                        name="isTransportVehicle"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    }
                    label="Transport or drive vehicle"
                  />
                </Grid>
         
                <Grid container justify="center" alignItems="center">
                  <FormBtn
                    disabled={!(formObject.from && formObject.to)}
                    onClick={handleFormSubmit}
                  >
                    Request Ride
                  </FormBtn>
                </Grid>
                <br />
                <Grid container justify="center" alignItems="center">
                <div>
                  <Link to="/ride">Ride </Link>
                  <Link to="/drive">Drive </Link>
                  <Link to="/myTrips"> | My Trips</Link>
                </div>
              </Grid>
              </form>
            </Grid>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default Ride;
