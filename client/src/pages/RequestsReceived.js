import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link, useParams } from "react-router-dom";
import { Container, Col, Row } from "../components/Grid"; // removed container
import { List, ListItem } from "../components/List"; //
import AcceptBtn from "../components/AcceptBtn"; //
import CancelBtn from "../components/CancelBtn"; //
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

function RequestsReceived(props) {
  // Setting our component's initial state
  const [selectedTrip, setSelectedTrip] = useState({});
  // const [tempTrip, setTempTrip] = useState();
  const [matchingRequests, setMatchingRequests] = useState([]);

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
      .then((res) => window.location.reload())
      // loadMyTripsRefresh()) // reload
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
              <h1>Requests Received</h1>
            </Jumbotron>
            <Grid container justify="center" alignItems="center">
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
              <List>
                <Grid container justify="center" alignItems="center">
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
                </Grid>
              </List>
            ) : (
              <Grid container justify="center" alignItems="center">
                <div>
                  <h3>Hang in there... someone will evetually need a ride!</h3>
                  <br />
                </div>
              </Grid>
            )}
            <Grid container justify="center" alignItems="center">
                <Link to="/ride">Ride </Link>
                <Link to="/drive">Drive </Link>
                <Link to="/myTrips"> | My Trips</Link>
                <Link to="/requestscreated"> | Requests Created</Link>
          
            </Grid>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default RequestsReceived;
