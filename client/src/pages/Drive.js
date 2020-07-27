import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeclineBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import "./drive.css";

function Drive() {
  // Setting our component's initial state
  const [trips, setTrip] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [carryPackage, setCarryPackage] = useState(false);
  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadTrips();
  }, []);

  // TODO Loads recent Requests with status = 'complete' and sets them to trips
  function loadTrips() {
    API.getTrips()
      .then(function (res) {
        setTrip(res.data);
        console.log("My Trips  ", res.data);
      })
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleCarryPackageChange(e) {
    const checked = e.target.checked;
    console.log("carryPackage checked:", checked);
    setCarryPackage(checked); // sets DOM checkbox
    setFormObject({ ...formObject, carryPackage: checked }); // sets formObject
  }

  // When the form is submitted, use the API.saveTrip method to save the trip data
  // Then reload trips from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("FormObject carryPackage= ", formObject.carryPackage);
    // if (formObject.from && formObject.to) {
    // From: and To: fields are mandatory.
    API.saveTrip({
      from: formObject.from,
      to: formObject.to,
      departTime: formObject.time,
      departDate: formObject.date,
      freeSeats: formObject.freeSeats,
      carryPackage: formObject.carryPackage,
      tripNote: formObject.tripNote,
      // user_id: req.user,
    })
      // .then((res) => loadTrips())
      .then((res) => alert(JSON.stringify(res.data)))
      .catch((err) => console.log(err));
    // }
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Drive</h1>
          </Jumbotron>
          <form action="#">
            <Input
              onChange={handleInputChange}
              name="from"
              placeholder="From (required)"
            />
            <Input
              onChange={handleInputChange}
              name="to"
              placeholder="To (required)"
            />
            <Input
              onChange={handleInputChange}
              type="date"
              name="date"
              placeholder="Date you'll be leaving..."
            />
            <Input
              onChange={handleInputChange}
              type="time"
              name="time"
              placeholder="Time you'll be leaving..."
            />
            <Input
              onChange={handleInputChange}
              type="number"
              name="freeSeats"
              placeholder="Number of seats available..."
            />
            <TextArea
              onChange={handleInputChange}
              name="tripNote"
              placeholder="Enter note about your trip..."
            />

            <label>
              <input
                type="checkbox"
                name="carryPackage"
                onChange={handleCarryPackageChange}
                checked={carryPackage}
              />
              <span>Able to carry package</span>
            </label>

            <FormBtn
              disabled={!(formObject.from && formObject.to)}
              onClick={handleFormSubmit}
            >
              Post Trip
            </FormBtn>
          </form>
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

export default Drive;
