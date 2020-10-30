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
import AccountCircle from "@material-ui/icons/AccountCircle";
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

import Typography from "@material-ui/core/Typography";
import ImgMediaCardProfile from "../components/ImgMediaCardProfile";
import Axios from "axios";

function Profile() {
  // Setting our component's initial state

  const [feedList, setFeedList] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

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
      maxHeight: "90vh",
    },
    textField: {
      margin: theme.spacing(2),
      maxWidth: "100%",
    },
  }));
  const classes = useStyles();

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    getUser(); // Get current user details
    loadNewsfeedList(); // TODO change to webscrapper API to get rewards points
  }, []);

  const getUser = () => {
    Axios.get("/api/users/current-user")
      .then((res) => {
        setCurrentUser(
          res.data.data
        );
        console.log("user",res.data.data);
        return true;
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
  };

  // TODO Loads recent trips with user_id = 'userId' and sets them to feedList
  function loadNewsfeedList() {
    API.getTripsCompleted() // Get my trips with status = "Complete"
      .then((res) => {
        setFeedList(res.data);
        console.log("Feedlist", res.data);
      })
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
                  <AccountCircle fontSize="large" />
                  <Typography variant="outline" component="h3">
                    Profile
                  </Typography>
                </Grid>
              </Jumbotron>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <ImgMediaCardProfile currentUser={currentUser} />
              </Grid>
              <SimpleBottomNavigation />
            </Col>
          </Row>
        </ThemeProvider>
      </Container>
    </Box>
  );
}
export default Profile;
