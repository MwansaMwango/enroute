import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "../components/Grid"; // removed container
import { List, ListItem } from "../components/List"; //
import AcceptBtn from "../components/AcceptBtn"; //
import DeclineBtn from "../components/DeclineBtn"; //
import DeleteBtn from "../components/DeleteBtn"; //
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


function RequestsReceived() {
  // Setting our component's initial state
  const [matchingRequests, setMatchingRequests] = useState([]);
  const [formObject, setFormObject] = useState({});

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadMatchingRequests();
  }, []);

  // TODO Loads recent Requests with status = 'complete' and sets them to trips
  function loadMatchingRequests() {
    API.getRequests() // TODO Change to matching requests
      .then(function (res) {
        setMatchingRequests(res.data);
        console.log("loaded matches ", res.data);
      })
      .catch((err) => console.log(err));
  }

  // Accept a matching request from the loaded list with a given id, then reloads matching requests from the db
  function acceptRequest(id) {
    API.acceptRequest(id)
      .then((res) => loadMatchingRequests())
      .catch((err) => console.log(err));
  }
  // Undo the accept matching request action
  function undoAcceptRequest(id) {
    API.undoAcceptRequest(id)
      .then((res) => loadMatchingRequests())
      .catch((err) => console.log(err));
  }

  // Decline a matching request from the loaded list with a given id, then reloads matching requests from the db
  function declineRequest(id) {
    API.declineRequest(id)
      .then((res) => loadMatchingRequests())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  return (
    <Box>
      <Container spacing={3} fluid maxWidth="100vw">
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Requests Received</h1>
            </Jumbotron>

            {matchingRequests.length ? (
              <Grid container justify="space-around" alignItems="center">
                <List>
                  {matchingRequests.map((match) => (
                    <Grid container justify="space-around" alignItems="center">
                      <ListItem key={match._id}>
                        <Link to={"/requests/" + match._id}>
                          <strong>
                            {match.from} - {match.to} <br/>
                          </strong>
                          {moment(match.departDate).format('MM/DD/YYYY')} {' '}
                          {match.departTime} {' '}

                          {match.status}
                        </Link>
                        <br></br>
                        <AcceptBtn onClick={() => acceptRequest(match._id)} />
                        <DeleteBtn
                          onClick={() => undoAcceptRequest(match._id)}
                        />
                        <DeclineBtn onClick={() => declineRequest(match._id)} />
                      </ListItem>
                    </Grid>
                  ))}
                <Row>
                  <Col size="md-2">
                    <Link to="/ride">Ride </Link>
                    <Link to="/requestscreated">|  Requests Created</Link>
                  </Col>
                </Row>
                </List>
              </Grid>
            ) : (
              <h3>No matching requests to display</h3>
            )}
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default RequestsReceived;
