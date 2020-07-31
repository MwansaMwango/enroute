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

function RequestsCreated() {
  // Setting our component's initial state
  const [requests, setRequests] = useState([]);

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadRequests();
  }, []);

  // TODO Loads recent Requests with user_id = 'userId' and sets them to trips
  function loadRequests() {
    API.getRequests() //
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }

  // Call driver who accepted request
  function callDriver(id) {
    API.callDriver(id)
      .then((res) => loadRequests())
      .catch((err) => console.log(err));
  }
  // Email driver who accepted request
  function emailDriver(id) {
    API.emailDriver(id)
      .then((res) => loadRequests())
      .catch((err) => console.log(err));
  }

  // Decline a matching request
  function cancelRequest(id) {
    API.cancelRequest(id)
      .then((res) => loadRequests())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Requests Created</h1>
          </Jumbotron>
          {requests.length ? (
            <List>
              {requests.map((request) => (
                <Grid container justify="space-around" alignItems="center">
                  <ListItem key={request._id}>
                    <Link to={"/requests/" + request._id}>
                      <strong>
                        {request.from} - {request.to} <br />
                      </strong>
                      {moment(request.departDate).format("MM/DD/YYYY")}{" "}
                      {request.departTime} {' '}
                      <strong>
                      {request.status}
                      </strong>

                    </Link>
                    <br></br>
                    <AcceptBtn onClick={() => callDriver(request._id)}>
                      Phone
                    </AcceptBtn>
                    <AcceptBtn onClick={() => emailDriver(request._id)}>
                      Email
                    </AcceptBtn>
                    <DeclineBtn onClick={() => cancelRequest(request._id)}>
                      Cancel
                    </DeclineBtn>
                    <strong>{request.status}</strong>
                  </ListItem>
                  </Grid>
              ))}
            </List>
          ) : (
            <h3>No matching requests to display</h3>
          )}
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/ride">Ride </Link>
          <Link to="/requests">|  Requests</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default RequestsCreated;
