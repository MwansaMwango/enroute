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

function MyRequests() {
  // Setting our component's initial state
  const [requests, setRequests] = useState([]);
  const [page, setPage] = React.useState("ride");

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadRequests();
  }, []);

  // TODO Loads recent Requests with user_id = 'userId' and sets them to trips
  function loadRequests() {
    API.getRequests() //
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }

  // Call driver who accepted request
  function callDriver(id) {
    API.callDriver(id)
      .then((res) => loadRequests())
      .catch((err) => console.log(err));
  }
  // Email driver who accepted request
  function emailDriver(id) {
    API.emailDriver(id)
      .then((res) => loadRequests())
      .catch((err) => console.log(err));
  }

  // Decline a matching request
  function cancelRequest(id) {
    API.cancelRequest(id)
      .then((res) => loadRequests())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>My Requests</h1>
          </Jumbotron>
          <br />
          {requests.length ? (
            <Grid
              spacing={3}
              container
              justify="space-around"
              alignItems="center"
            >
              <List>
                {requests.map((request) => (
                  <ListItem key={request._id}>
                    <strong>
                      {request.from} - {request.to} <br />
                    </strong>
                    {moment(request.departDate).format("MM/DD/YYYY")}{" "}
                    {request.departTime} <strong>{request.status}</strong>
                    {console.log("Reqest object = ", request)}
                    <br />
                    {(() => {
                      switch (request.status) {
                        case "Pending":
                          return null;
                        // <h5>Pending drivers</h5>;

                        case "Confirmed":
                          return (
                            <div>
                              <h5>
                                {request.driver_id.firstName} |
                                {request.driver_id.phone}
                              </h5>
                              {/* TODO button to send notification, email, text, call driver */}
                            </div>
                          );
                      }
                    })()}
                    <br />
                  </ListItem>
                ))}
              </List>
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
                width: "100%",

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
                  label="Points(future)"
                  icon={<EmojiEventsIcon />}
                />
              </BottomNavigation>
            </div>
          </Grid>
        </Col>
      </Row>
    </Container>
  );
}

export default MyRequests;
