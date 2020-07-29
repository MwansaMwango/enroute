import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeclineBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import "./drive.css";

function Ride() {
  // Setting our component's initial state
  const [trips, setTrip] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [hasPackage, setHasPackage] = useState(false);
  const [isTransportVehicle, setIsTransportVehicle] = useState(false);

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadTrips();
    loadRoutes();
  }, []);

  // TODO Loads recent Requests with status = 'complete' and sets them to trips
  function loadTrips() {
    API.getTrips()
      .then((res) => setTrip(res.data))
      .catch((err) => console.log(err));
  }

  function loadRoutes() {
    let routeList = [];
    let uniqueRouteList = [];
    API.getRoutes()
      .then(function (res) {

        res.data.map((route) => {
          routeList.push(route.from, route.to);
        });
        uniqueRouteList = [...new Set(routeList)] // removes duplicate elements in array
        setRoutes(uniqueRouteList);
        console.log("Preset routes all  ", routeList);
        console.log("Preset routes unique  ", uniqueRouteList);
      })
      .catch((err) => console.log(err));
    }

  // Deletes a trip from the database with a given id, then reloads trips from the db
  function deleteTrip(id) {
    API.deleteTrip(id)
      .then((res) => loadTrips())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleHasPackageChange(e) {
    const checked = e.target.checked;
    console.log("hasPackage checked:", checked);
    setHasPackage(checked); // sets DOM checkbox
    setFormObject({ ...formObject, "hasPackage": checked }); // sets formObject
  }

  function handleIsTransportVehicleChange(e) {
    const checked = e.target.checked;
    console.log("isTransportVehicle checked:", checked);
    setIsTransportVehicle(checked); // sets DOM checkbox
    setFormObject({ ...formObject, "isTransportVehicle": checked }); // sets formObject
  }

  // When the form is submitted, use the API.requestRide method to save the trip data
  // Then reload trips from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    alert("Searching for Drivers...") // TODO use Modal instead of alert 
    console.log("FormObject= ", formObject);
    // if (formObject.from && formObject.to) {
    // From: and To: fields are mandatory.
    API.requestRide({
      from: formObject.from,
      to: formObject.to,
      departTime: formObject.time,
      departDate: formObject.date,
      isTransportVehicle: formObject.isTransportVehicle,
      hasPackage: formObject.hasPackage,
      requestNote: formObject.requestNote,
      seatsRequired: formObject.seatsRequired,
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
            <h1>Ride</h1>
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
              name="seatsRequired"
              placeholder="Number of passengers..."
            />
            <TextArea
              onChange={handleInputChange}
              name="requestNote"
              placeholder="Enter note about your request..."
            />
            <label>
              <input
                type="checkbox"
                name="hasPackage"
                onChange={handleHasPackageChange}
                checked={hasPackage}
              />
              <span>Send a package</span>
            </label>
            <br></br>
            <label>
              <input
                type="checkbox"
                name="isTransportVehicle"
                onChange={handleIsTransportVehicleChange}
                checked={isTransportVehicle}
              />
              <span>Transport or drive vehicle</span>
            </label>

            <FormBtn
              disabled={!(formObject.from && formObject.to)}
              onClick={handleFormSubmit}
            >
              Request Ride
            </FormBtn>
          </form>
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

export default Ride;
