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
import SimpleSlider from "../components/SimpleSlider";
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

function NewsFeed({ isEdit, tripData }) {
  // Setting our component's initial state
  console.log("isEditMode =", isEdit, "tripData = ", tripData);
  const [trip] = useState(tripData);
  const [routes, setRoutes] = useState([]);
  const [feedList, setFeedList] = useState([]);
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
      maxHeight: "90vw",
    },
    textField: {
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),
      margin: theme.spacing(2),

      maxWidth: "100%",
    },
  }));
  const classes = useStyles();

  let uniqueRouteList = [];

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadRoutes();
    loadNewsfeedList(); // TODO change to webscrapper API to get rewards
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

    // TODO Loads recent trips with user_id = 'userId' and sets them to feedList
    function loadNewsfeedList() {
      API.getTripsCompleted() // Get my trips with status = "Complete"
        .then((res) => {
          setFeedList(res.data);
          console.log("Feedlist", res.data);
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
    API.saveTrip({
      from: formObject.from,
      to: formObject.to,
      departTime: formObject.time,
      departDate: formObject.date,
      freeSeats: formObject.freeSeats,
      carryPackage: formObject.carryPackage,
      tripNote: formObject.tripNote,
    })

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
      departTime: formObject.time || trip.departTime,
      departDate: formObject.date || trip.departDate,
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
              <Grid item>
                <SimpleSlider props={feedList} />
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
            </Col>
          </Row>
        </ThemeProvider>
      </Container>
    </Box>
  );
}

export default NewsFeed;
