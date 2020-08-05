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
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core/";

import "./drive.css";

function MyTrips() {
  // Setting our component's initial state
  const [myTrips, setMyTrips] = useState([]);
  const [matchingRequests, setMatchingRequests] = useState([]);


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

  // Find matching Requests using Trip Data
  function findMatchingRequests(tripData) {
    API.findMatchingRequests(tripData)
      .then(function (res) {
        setMatchingRequests(res.data);
        // console.log("Returned matching requests ", res.data);
      })
      .catch((err) => console.log(err));
  }

  // Undo the accept matching request action
  function updateTrip(id, tripData) {
    API.updateTrip(id, tripData)
      .then((res) => loadMyTripsRefresh())
      .catch((err) => console.log(err));
  }

  // Decline a matching request from the loaded list with a given id, then reloads matching requests from the db
  function deleteTrip(id) {
    API.deleteTrip(id)
      .then((res) => loadMyTrips())
      .catch((err) => console.log(err));
  }

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
                          {trip.from} - {trip.to} <br />
                        </strong>
                      </Link>
                      {moment(trip.departDate).format("MM/DD/YYYY")}{" "}
                      {trip.departTime}
                      <br />
                      <Grid container justify="space-around" alignItems="center">  
                      <DeclineBtn
                        btnName="CANCEL"
                        onClick={() => deleteTrip(trip._id)}
                      />
                      
                      <DeclineBtn
                        btnName="EDIT" color="#259CBB" // cyan
                        onClick={() => updateTrip(trip._id, trip)}
                      />
                      </Grid>
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
