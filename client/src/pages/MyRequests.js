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
import Switch from "@material-ui/core/Switch";
import InteractiveListTrips from "../components/InteractiveListTrips";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
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
import AlertDialog from "../components/AlertDialog";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

function MyRequests() {
  // Setting our component's initial state
  const [requests, setRequests] = useState([]);
  const [value, setValue] = React.useState(0);
  const [routes, setRoutes] = useState([]);
  const [formObject, setFormObject] = useState({});
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
        paddingBottom: "90px",
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
                  <EmojiPeopleRoundedIcon fontSize="large" />
                  <Typography variant="outline" component="h3">
                    Ride - My Requests
                  </Typography>
                </Grid>
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
                        No ride requests created <br />
                        Request your first ride! 😁
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              <Grid driection="row" justify="center" alignItems="center">
                <SimpleBottomNavigation />
              </Grid>
            </Col>
          </Row>
        </ThemeProvider>
      </Container>
    </Box>
  );
}

export default MyRequests;
