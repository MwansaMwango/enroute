
import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
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



import DeclineBtn from "../components/DeclineBtn"; //

import moment from "moment";
import { useParams } from "react-router-dom";

import { List, ListItem } from "../components/List"; //
import AcceptBtn from "../components/AcceptBtn"; //
import CancelBtn from "../components/CancelBtn"; //
import DeleteBtn from "../components/CancelBtn"; //


function RequestsReceived({ checkNotificationStatus }) {
  // Setting our component's initial state
  const [selectedTrip, setSelectedTrip] = useState({});
  // const [tempTrip, setTempTrip] = useState();
  const [matchingRequests, setMatchingRequests] = useState([]);
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState("ride");
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
      footer: {
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100",
        // backgroundcolor:
        // color: white,
        textAlign: "center",
      },

      demo: {
        backgroundColor: theme.palette.background.paper,
      },
      "& > svg": {
        margin: theme.spacing(2),
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(2),
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // When this component mounts, grab the trip with the _id of props.match.params.id
  // e.g. localhost:3000/requestsreceived/599dcb67f0f16317844583fc
  const { id } = useParams();

  useEffect(() => {
    getMatchesbyTripId(id);
  }, []);

  function getMatchesbyTripId(id) {
    API.getTrip(id)
      .then((res) => {
        findMatchingRequests(res.data);
        setSelectedTrip(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Find matching Requests using Trip Data
  function findMatchingRequests(tripData) {
    API.findMatchingRequests(tripData)
      .then((res) => {
        setMatchingRequests(res.data);
        // matchList.push(res);
        // console.log("Returned matching requests ", res.data);
      })
      .catch((err) => console.log(err));
  }

  // Accept a matching request from the loaded list with a given id, then reloads matching requests from the db
  function acceptRequest(id) {
    API.acceptRequest(id)
      .then((res) => checkNotificationStatus(res.data.status))
      .then(() => window.location.reload())

      .catch((err) => console.log(err));
  }
  // Undo the accept matching request action
  function undoAcceptRequest(id) {
    API.undoAcceptRequest(id)
      .then((res) => window.location.reload())
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
              <h1>Requests Received  <NotificationsActiveIcon fontSize="large" /></h1>
            </Jumbotron>
            <Grid container justify="space-around" alignItems="center">
              <div>
                <h2>
                  <strong>
                    {selectedTrip.from} - {selectedTrip.to}
                  </strong>
                  <br />
                  {moment(selectedTrip.departDate).format("MM/DD/YYYY")}{" "}
                  {selectedTrip.departTime}
                </h2>

                <h4>
                  {matchingRequests.length} Matching Requests Received for this
                  Trip!
                </h4>
              </div>
            </Grid>

            {matchingRequests.length ? (
              <Grid container justify="space-around" alignItems="space-evenly">
                <List>
                  {matchingRequests.map((match) => (
                    <ListItem key={match._id}>
                      <Link to={"/requests/" + match._id}>
                        <strong>
                          {match.from} - {match.to} <br />
                        </strong>
                      </Link>
                      {moment(match.departDate).format("MM/DD/YYYY")}{" "}
                      {match.departTime} - {match.status}
                      {/* Check for matching requests against match */}
                      {console.log("Match data ", match)}
                      {/* Add conditional render if there is a match in request pool for this each match */}
                      {console.log("Matches found array ", matchingRequests)}
                      <br />
                      <AcceptBtn
                        onClick={() => {
                          acceptRequest(match._id);
                        }}
                      />
                      <CancelBtn onClick={() => undoAcceptRequest(match._id)} />
                    </ListItem>
                  ))}
              </List>
                </Grid>
            ) : (
              <Grid container justify="center" alignItems="center">
                <div>
                  <h3>
                    Hang in there...😁 someone will evetually request a ride!
                  </h3>
                  <br />
                </div>
              </Grid>
            )}
            <div  style={{
                  position: "fixed",
                  left: "0",
                  bottom: "0",
                  width: "100vw",

                  textAlign: "center",
                }}>

          
           <BottomNavigation
                  value={page}
                  onChange={(event, newValue) => {
                    setPage(newValue);
                  }}
                  showLabels
                  className={classes.root}
               
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
                    label="Drive"
                    icon={<LocalTaxiIcon />}
                    href="/drive"
                  />
                  <BottomNavigationAction
                    label="Points(future)"
                    icon={<EmojiEventsIcon />}
                  />
                </BottomNavigation>
                </div>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default RequestsReceived;
