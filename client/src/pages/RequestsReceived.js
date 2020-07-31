import React, { useState, useEffect } from "react";
import AcceptBtn from "../components/AcceptBtn";
import UndoBtn from "../components/UndoBtn";
import DeclineBtn from "../components/DeclineBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { TextArea, FormBtn } from "../components/Form";
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
    API.getTrips() // TODO Change to matching requests
      .then((res) => setMatchingRequests(res.data))
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
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Requests Received</h1>
          </Jumbotron>
          {matchingRequests.length ? (
            <List>
              {matchingRequests.map((match) => (
                <ListItem key={match._id}>
                  <Link to={"/requests/" + match._id}> 
                    <strong>
                      {match.from} - {match.to}
                    </strong>
                    {match.departDate}
                    {match.departTime}
                    {match.status}
                  </Link>
                  <br></br>
                  <AcceptBtn onClick={() => acceptRequest(match._id)} />
                  <UndoBtn onClick={() => undoAcceptRequest(match._id)} />
                  <DeclineBtn onClick={() => declineRequest(match._id)} />
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
          <Link to="/drive">Go to Drive</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default RequestsReceived;
