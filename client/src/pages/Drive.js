import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import AccountCircle from "@material-ui/icons/AccountCircle";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import PublishIcon from "@material-ui/icons/Publish";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import LocalTaxiRoundedIcon from "@material-ui/icons/LocalTaxiRounded";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import MessageIcon from "@material-ui/icons/Message";
import FormGroup from "@material-ui/core/FormGroup";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
// import Alert from "@material-ui/lab/Alert";
import Switch from "@material-ui/core/Switch";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
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
function Drive() {
  // Setting our component's initial state

  const [trips, setTrip] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [carryPackage, setCarryPackage] = useState(false);

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
        margin: theme.spacing(1),
        width: "100%",
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
  const [value, setValue] = React.useState(0);
  // const [state, setState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  // });

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  let uniqueRouteList = [];

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadTrips();
    loadRoutes();
  }, []);

  // TODO Loads recent Requests with status = 'complete' and sets them to trips
  function loadTrips() {
    API.getTrips()
      .then(function (res) {
        setTrip(res.data);
        console.log("My Trips  ", res.data);
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
  console.log("loggin uniue routes =", uniqueRouteList);
  // console.log("loggin uniue routes =",routeList)

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
      // user_id: req.user,
    })
      .then(function (res) {
        //   return (
        //     <div className={classes.root}>
        //       <Alert severity="success" color="info">
        //         Trip posted successfully!
        //       </Alert>
        //     </div>
        //   );
      })
      .then((res) => alert(JSON.stringify(res.data)))
      .catch((err) => console.log(err));
    // }
  }

  return (
    <Box>
      <Container fluid maxWidth="100vw">
        <ThemeProvider theme={theme}>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>Drive<LocalTaxiIcon fontSize="large"/></h1>
              </Jumbotron>

              <Grid container justify="center" alignItems="center">
                <form className={classes.root}>
                  <Grid item>
                    <TextField
                      className={classes.margin}
                      id="from"
                      select
                      label="From (required)"
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
                      id="outlined-basic"
                      label="Free Seats?"
                      variant="outlined"
                      onChange={handleInputChange}
                      type="number"
                      defaultValue={1}
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

                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={carryPackage}
                          onChange={handleCarryPackageChange}
                          name="carryPackage"
                        />
                      }
                      label="Able to carry package"
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
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <FormBtn
                      disabled={!(formObject.from && formObject.to)}
                      onClick={handleFormSubmit}
                    >
                      Post Trip
                    </FormBtn>
                  </Grid>

                  <br />
                  <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                    // style={{background:"#022222", color:"white"}}
                  >
                    <BottomNavigationAction
                      label="Ride"
                      icon={<EmojiPeopleRoundedIcon />}
                      href="/ride"
                    />

                    <BottomNavigationAction
                      label="My Trips"
                      icon={<PersonPinCircleIcon />}
                      href="/myTrips"
                    />
                    <BottomNavigationAction
                      label="Newsfeed (future)"
                      icon={<MessageIcon />}
                    />
                    <BottomNavigationAction
                      label="Points (future)"
                      icon={<EmojiEventsIcon />}
                    />
                  </BottomNavigation>
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
