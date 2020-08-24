import React, { useState, useEffect } from "react";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import MessageIcon from "@material-ui/icons/Message";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import InteractiveListTrips from "../components/InteractiveListTrips";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Container, Col, Row } from "../components/Grid"; // removed container

import {
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import {
  Box,
  Grid,
} from "@material-ui/core/";

import "./drive.css";

function MyTrips() {
  // Setting our component's initial state
  const [myTrips, setMyTrips] = useState([]);

  const [, setMatchingRequests] = useState([]);


  const useStyles = makeStyles(() => ({
    root: {
      container: {
          width: "90vw",
      },
    },
  }));

  const [, setValue] = React.useState(0);
  const [page, setPage] = React.useState("ride");

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

  // Update the accept matching request action
  function updateTrip(id, tripData) {
    API.updateTrip(id, tripData)
      .then(() => loadMyTripsRefresh())
      .catch((err) => console.log(err));
  }

  // Decline a matching request from the loaded list with a given id, then reloads matching requests from the db
  function deleteTrip(id) {
    API.deleteTrip(id)
      .then(() => loadMyTrips())
      .catch((err) => console.log(err));
  }

  return (
    <Box
      style={{
        paddingBottom: "50px",
      }}
    >
      <Container fluid maxWidth="md">
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                My Trips <PersonPinCircleIcon fontSize="large" />
              </h1>
            </Jumbotron>
            <br />
            {myTrips.length ? (
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
         
                  {myTrips.map((trip) => (
                    <div>
                      <InteractiveListTrips
                        props={trip}
                        deleteTrip={deleteTrip}
                        updateTrip={updateTrip}
                      />
                    </div>
                  ))}
   
              </Grid>
            ) : (
              <Grid container justify="center" alignItems="space-around">
                <h3>
                  No trips yet. Register your next trip to start earning points.
                </h3>
              </Grid>
            )}
            <Grid direction="row" justify="center" alignItems="center">
              <div
                style={{
                  position: "fixed",
                  left: "0",
                  bottom: "0",
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
                    label="News(future)"
                    icon={<MessageIcon />}
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
    </Box>
  );
}

export default MyTrips;
