import React, { useState, useEffect } from "react";
import AcceptBtn from "../components/AcceptBtn";
import UndoBtn from "../components/UndoBtn";
import DeclineBtn from "../components/DeclineBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
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
                <ListItem key={request._id}>
                  <Link to={"/requests/" + request._id}> 
                    <strong>
                      {request.from} - {request.to}
                    </strong>
                    {request.departDate}
                    {request.departTime}
                    {request.status}
                  </Link>
                  <br></br>
                  <button onClick={() => callDriver(request._id)} >Phone</button>
                  <button onClick={() => emailDriver(request._id)} >Email</button>
                  <button onClick={() => cancelRequest(request._id)} >Cancel</button>
                  <strong >{request.status}</strong>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No matching requests to display</h3>
          )}
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/ride">Go to Ride</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default RequestsCreated;
