import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
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
import Popper from "@material-ui/core/Popper";
// import Alert from "@material-ui/lab/Alert";
import Switch from "@material-ui/core/Switch";
import InteractiveListTrips from "../components/InteractiveListTrips";
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

import { List, ListItem } from "../components/List"; //

import DeclineBtn from "../components/DeclineBtn"; //

import moment from "moment";
import InteractiveListRequests from "../components/InteractiveListRequests";

function MyRequests() {
  // Setting our component's initial state
  const [requests, setRequests] = useState([]);
  const [value, setValue] = React.useState(0);
  const [routes, setRoutes] = useState([]);

  const [formObject, setFormObject] = useState({});
  const [page, setPage] = React.useState("ride");

  const useStyles = makeStyles((theme) => ({
    root: {
      container: {
        width: "90vw",
      },
    },
  }));

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadMyRequests();
    loadRoutes();
  }, []);

  // TODO Loads recent Requests with user_id = 'userId' and sets them to trips
  function loadMyRequests() {
    API.getRequests() // Get my requests
      .then((res) => {
        setRequests(res.data);
        console.log("loadMyRequests", res.data);
      })
      .catch((err) => console.log(err));
  }

  let uniqueRouteList = []; // expose unique route list
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

  // Delete a request from the loaded list with a given id, then reloads  requests from the db
  function deleteRequest(id) {
    API.deleteRequest(id)
      .then((res) => loadMyRequests())
      .catch((err) => console.log(err));
  }

  // Edit request from the loaded list with a given id, then reloads requests from the db
  function editRequest(id, requestData) {
    API.updateRequest(id, requestData)
      .then((res) => loadMyRequests())
      .catch((err) => console.log(err));
  }

  return (
    <Box
      style={{
        paddingBottom: "50px",
      }}
    >
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                My Requests <EmojiPeopleRoundedIcon fontSize="large" />
              </h1>
            </Jumbotron>
            <br />
            {requests.length ? (
              <Grid
                ontainer
                justify="center"
                alignItems="center"
                direction="column"
              >
                {requests.map((request) => (
                  <div key={request._id}>
                    <InteractiveListRequests
                      props={request}
                      deleteRequest={deleteRequest}
                      editRequest={editRequest}
                    />
                  </div>
                ))}
              </Grid>
            ) : (
              <Grid container justify="space-around" alignItems="center">
                <h3>No ride requests created.</h3>
              </Grid>
            )}
            <Grid driection="row" justify="center" alignItems="center">
              <div
                style={{
                  position: "fixed",
                  left: "0",
                  bottom: "0",
                  height: "50px",
                  width: "90%",
                  textAlign: "center",
                }}
              >
                <BottomNavigation
                  value={page}
                  onChange={(event, newValue) => {
                    setPage(newValue);
                  }}
                  showLabels
                  // className={classes.root}
                >
                  <BottomNavigationAction
                    label="Ride"
                    icon={<EmojiPeopleRoundedIcon />}
                    href="/ride"
                  />
                  <BottomNavigationAction
                    label="Drive"
                    icon={<LocalTaxiIcon />}
                    href="/drive"
                  />
                  <BottomNavigationAction
                    label="My Trips"
                    icon={<PersonPinCircleIcon />}
                    href="/myTrips"
                  />
                  <BottomNavigationAction
                    label="Newsfeed"
                    icon={<MessageIcon />}
                    href="/newsfeed"
                  />
                </BottomNavigation>
              </div>
            </Grid>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default MyRequests;
