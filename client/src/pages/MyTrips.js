import React, { useState, useEffect } from "react";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import MessageIcon from "@material-ui/icons/Message";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import InteractiveListTrips from "../components/InteractiveListTrips";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Container, Col, Row } from "../components/Grid"; // removed container
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import "./drive.css";

function MyTrips() {
  // Setting our component's initial state
  const [myTrips, setMyTrips] = useState([]);
  const [matchingRequests, setMatchingRequests] = useState([]);

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
    cardStyle: {
      "& .MuiCardMedia-img": {
        // css specific selector for image
        height: "100px",
        width: "100%",
        objectFit: "contain",
      },
      maxWidth: 345,
      margin: "10px 0px 10px 0px",
      borderRadius: 20,
      pointerEvents: "none", // remove click options from card
    },
  }));

  const classes = useStyles();

  const [, setValue] = React.useState(0);
  const [page, setPage] = React.useState("ride");

  useEffect(() => {
    loadMyTrips();
  }, []);

  // Load My Trips
  function loadMyTrips() {
    API.getTrips() // Get My Trips
      .then((res) => {
        setMyTrips(res.data);
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
  // function findMatchingRequests(tripData) {
  //   API.findMatchingRequests(tripData)
  //     .then(function (res) {
  //       setMatchingRequests(res.data);
  //       // console.log("Returned matching requests ", res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

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
      <Container fluid maxWidth="100vw">
        <ThemeProvider theme={theme}>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <PersonPinCircleIcon fontSize="large" />
                  <Typography variant="outline" component="h3">
                    Drive - My Trips
                  </Typography>
                </Grid>
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
                    <div key={trip._id}>
                      <InteractiveListTrips
                        props={trip}
                        deleteTrip={deleteTrip}
                        updateTrip={updateTrip}
                      />
                    </div>
                  ))}
                </Grid>
              ) : (
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  {/* <div {{ backgroundColor: "white", maxWidth: "100%", borderRadius: 20, boxShadow: "5px 5px 5px #8888"}}> */}
                  <Card className={classes.cardStyle} raised={true}>
                    <CardContent>
                      <CardMedia
                        component="img"
                        alt="Card Media"
                        height="100"
                        title="Card Media Title"
                        image={require("../assets/undraw-waiting.svg")}
                      ></CardMedia>
                      <Typography
                        className={classes.typography}
                        variant="body1"
                        style={{ textAlign: "center" }}
                        component="p"
                      >
                        No trips posted yet.
                        <br />
                        Post your first trip! 😁
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              <SimpleBottomNavigation />
            </Col>
          </Row>
        </ThemeProvider>
      </Container>
    </Box>
  );
}

export default MyTrips;
