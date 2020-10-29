import React, { useState, useEffect } from "react";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import MessageIcon from "@material-ui/icons/Message";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
import InteractiveListMatches from "../components/InteractiveListMatches";
import Jumbotron from "../components/Jumbotron";
import TripCardHeader from "../components/TripCardHeader";
import API from "../utils/API";
import { Container, Col, Row } from "../components/Grid"; // removed container
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core/";

import "./drive.css";

import moment from "moment";
import { useParams } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

function RequestsReceived({ checkNotificationStatus }) {
  // Setting our component's initial state
  const [selectedTrip, setSelectedTrip] = useState({});
  const [matchingRequests, setMatchingRequests] = useState([]);
  const [page, setPage] = React.useState("ride");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertMsg, setAlertMsg] = React.useState();

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#FF9057",
        main: "#E64500",
        dark: "#259CBB",
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
    root: {
      container: {
        width: "90vw",
      },
    },
    cardStyle: {
      "& .MuiCardMedia-img": { // css specific selector for image
        height: '100px',
        width: '100%',
        objectFit: 'contain'
      },
      maxWidth: 345,
      margin: "10px 0px 10px 0px",
      borderRadius: 20,
      pointerEvents: "none", // remove click options from card
 
    },
    typography: {
      fontFamily: "Montserrat",
    },

  }));

  const classes = useStyles();

  // When this component mounts, grab the trip with the _id of props.match.params.id
  // e.g. localhost:3000/trips/599dcb67f0f16317844583fc
  const { id } = useParams();

  useEffect(() => {
    getMatchesbyTripId(id);
  }, []);

  function getMatchesbyTripId(id) {
    API.getTrip(id)
      .then((res) => {
        findMatchingRequests(res.data); // use trip data to find matching requests
        setSelectedTrip(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Find matching Requests using Trip Data
  function findMatchingRequests(tripData) {
    API.findMatchingRequests(tripData)
      .then((res) => {
        setMatchingRequests(res.data); // re-renders matching requests
      })
      .catch((err) => console.log(err));
  }

  // Accept a matching request from the loaded list with a given id, then reloads matching requests from the db
  function acceptRequest(id, trip_idObject) {
    API.acceptRequest(id, trip_idObject)
      .then((res) => {
        setAlertMsg("accept");
        handleOpenAlertDialog();
        findMatchingRequests(selectedTrip); //re-renders matching requests
      })
      .catch((err) => console.log(err));
  }

  // Undo the accept matching request action
  function undoAcceptRequest(id, trip_idObject) {
    // request_id
    console.log("id = ", id, "trip_idObject = ", trip_idObject);
    API.undoAcceptRequest(id, trip_idObject)
      .then(() => {
        setAlertMsg("cancel");
        handleOpenAlertDialog();
        findMatchingRequests(selectedTrip);
      })
      .catch((err) => console.log(err));
  }

  function handleOpenAlertDialog() {
    setAlertDialogOpen(true);
  }

  function handleCloseAlertDialog() {
    setAlertDialogOpen(false);
  }

  return (
    <Box
      style={{
        paddingBottom: "90px", // ensures content is not hidden by footer
      }}
    >
      <ThemeProvider theme={theme}>
        <Container fluid maxWidth="100vw">
          <Row>
            <Col size="md-12">
              {alertDialogOpen && alertMsg === "accept" ? (
                <AlertDialog
                  dialogOpen={true}
                  btnOpenTxt="accept"
                  dialogTitle="Booking Confirmed"
                  dialogContentTxt="Notification sent to requestor"
                  btnOKTxt="OK"
                  handleClose={handleCloseAlertDialog}
                />
              ) : alertDialogOpen && alertMsg === "cancel" ? (
                <AlertDialog
                  dialogOpen={true}
                  btnOpenTxt="cancel"
                  dialogTitle="Booking Cancelled"
                  dialogContentTxt="Notification sent to requestor"
                  btnOKTxt="OK"
                  handleClose={handleCloseAlertDialog}
                />
              ) : null}

              <Jumbotron>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <NotificationsActiveIcon fontSize="large" />
                  <Typography variant="outline" component="h3">
                    Drive - Requests Received
                  </Typography>
                </Grid>
              </Jumbotron>

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <TripCardHeader
                  selectedTripData={selectedTrip}
                  matches={matchingRequests.length}
                />
              </Grid>

              {matchingRequests.length ? (
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  direction="column"
                >
                  {matchingRequests.map((match) => (
                    <div>
                      <InteractiveListMatches
                        {...(match.trip_id = selectedTrip._id)} // spread syntax - bind trip_id to the matched request
                        props={match}
                        undoAcceptRequest={undoAcceptRequest}
                        acceptRequest={acceptRequest}
                        className={classes.typography}
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
                        Hang in there! 😁 <br />
                        Someone will request a ride, eventually...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              <SimpleBottomNavigation />
            </Col>
          </Row>
        </Container>
      </ThemeProvider>
    </Box>
  );
}

export default RequestsReceived;
