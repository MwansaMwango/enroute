import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "../components/Grid"; // removed container
import { List, ListItem } from "../components/List"; //
import AcceptBtn from "../components/AcceptBtn"; //
import DeclineBtn from "../components/DeclineBtn"; //
import DeleteBtn from "../components/CancelBtn"; //
import moment from "moment";
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

function MyTrips() {
  // Setting our component's initial state
  const [myTrips, setMyTrips] = useState([]);
  // const [tempTrip, setTempTrip] = useState();
  const [matchingRequests, setMatchingRequests] = useState([]);

  // const [formObject, setFormObject] = useState({});

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  // useEffect(() => {
  //   findMatchingRequests(tempTrip);
  // }, []);
  // findMatchingRequests(tempTrip);

  useEffect(() => {
    loadMyTrips();
  }, []);

  // Load My Trips
  function loadMyTrips() {
    API.getTrips() // Get My Trips
      .then((res) => {
        console.log("All my Trips ", res.data);
        setMyTrips(res.data);

        console.log("getMatchList called");
        res.data.map((trip) => {
          console.log("Trip in All Trips = ", trip);
          findMatchingRequests(trip);
        });
        // getMatchList(myTrips);
      })
      .catch((err) => console.log(err));
  }
  // Load My Trips Again
  function loadMyTripsRefresh() {
    API.getTrips() // Get My Trips
      .then((res) => {
        setMyTrips(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Check if each trip has a matching request
  // function getMatchList(allTrips) {
  //   allTrips.map((trip) => {
  //     console.log("Trip in All Trips = ", trip);
  //     // return findMatchingRequests(trip);
  //   });
  // }

  // Find matching Requests using Trip Data
  function findMatchingRequests(tripData) {
    API.findMatchingRequests(tripData)
      .then(function (res) {
        setMatchingRequests(res.data);
        // matchList.push(res);
        // console.log("Returned matching requests ", res.data);
      })
      .catch((err) => console.log(err));
  }

  // Accept a matching request from the loaded list with a given id, then reloads matching requests from the db
  function acceptRequest(id) {
    API.acceptRequest(id)
      .then((res) => (window.location.href = "/"))
      // loadMyTripsRefresh()) // reload
      .catch((err) => console.log(err));
  }
  // Undo the accept matching request action
  function undoAcceptRequest(id) {
    API.undoAcceptRequest(id)
      .then((res) => loadMyTripsRefresh())
      .catch((err) => console.log(err));
  }

  // // Decline a matching request from the loaded list with a given id, then reloads matching requests from the db
  // function declineRequest(id) {
  //   API.declineRequest(id)
  //     .then((res) => loadMyTrips())
  //     .catch((err) => console.log(err));
  // }

  // // Handles updating component state when the user types into the input field
  // function handleInputChange(event) {
  //   const { name, value } = event.target;
  //   setFormObject({ ...formObject, [name]: value });
  // }

  return (
    <Box>
      <Container spacing={3} fluid maxWidth="100vw">
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>My Trips</h1>
            </Jumbotron>
            {myTrips.length ? (
              <Grid container justify="space-around" alignItems="center">
                <List>
                  {myTrips.map((trip) => (
                    <ListItem key={trip._id}>
                      <Link to={"/trips/" + trip._id}>
                        <strong>
                          {trip._id} <br />
                          {trip.from} - {trip.to} <br />
                        </strong>
                      </Link>
                      {moment(trip.departDate).format("MM/DD/YYYY")}{" "}
                      {trip.departTime}
                      <br />
                      <DeclineBtn onClick={() => undoAcceptRequest(trip._id)}>
                        Cancel Trip
                      </DeclineBtn>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ) : (
              <Grid container justify="center" alignItems="center">
              <h3>
                No trips yet. Register your next trip to start earning points.
              </h3>
              </Grid>
            )}
            <Grid container justify="center" alignItems="center">
              <div>
                <Link to="/ride">Ride </Link>
                <Link to="/drive">Drive </Link>
                <Link to="/myTrips"> | My Trips</Link>
                <Link to="/requestscreated"> | Requests Created</Link>
              </div>
            </Grid>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default MyTrips;
