import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import "./trip.css";

function Trip() {
  // Setting our component's initial state
  const [trips, setTrip] = useState([]);
  const [formObject, setFormObject] = useState({});

  // TODO Initialise and Load Requests from database, to be displayed in newfeed
  useEffect(() => {
    loadTrips();
  }, []);

  // TODO Loads recent Requests with status = 'complete' and sets them to trips
  function loadTrips() {
    API.getTrips()
      .then((res) => setTrip(res.data))
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

  // When the form is submitted, use the API.saveTrip method to save the trip data
  // Then reload trips from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(formObject);
    // if (formObject.from && formObject.to) {
    // From: and To: fields are mandatory.
    API.saveTrip({
      from: formObject.from,
      to: formObject.to,
      departTime: formObject.time,
      departDate: formObject.date,
      freeSeats: formObject.freeSeats,
      tripNote: formObject.tripNote,
      // user_id: req.user,
    })
      // .then((res) => loadTrips())
      .then((res) => alert(JSON.stringify(res.data)))
      .catch((err) => console.log(err))
    // }
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Drive</h1>
          </Jumbotron>
          <form>
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
            <FormBtn
              disabled={!(formObject.from && formObject.to)}
              onClick={handleFormSubmit}
            >
              Post Trip
            </FormBtn>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Trip;

// {
// <FormGroup>
// <Label for="exampleDatetime">Datetime</Label>
// <Input
//   type="datetime"
//   name="datetime"
//   id="exampleDatetime"
//   placeholder="datetime placeholder"
// />
// </FormGroup>
// <FormGroup>
// <Label for="exampleDate">Date</Label>
// <Input
//   type="date"
//   name="date"
//   id="exampleDate"
//   placeholder="date placeholder"
// />
// </FormGroup>
// <FormGroup>
// <Label for="exampleTime">Time</Label>
// <Input
//   type="time"
//   name="time"
//   id="exampleTime"
//   placeholder="time placeholder"
// />
// </FormGroup>
// }

// <center>
//   <div className="container" id="header-strip">
//     <center>
//       <div className="row map_contents">
//         <div className="col s12 map" id="map"></div>
//       </div>
//     </center>
//     <div className="row">
//         <h4 className="pleaseLogIn">Enter the pickup request details</h4>

//     </div>
//     <div className="row">

//       <form className="col s12 m12 signup" id="signupFrm" method="post">
//         <div className='row'>
//           <div className='input-field col s12'>
//             <i className="material-icons md-18 prefix">location_searching</i>
//             <input className='validate' type='text' name='pickupLocn' id='pickupLocn' />
//             <label for='pickupLocn'>Enter pick up location</label>
//           </div>
//         </div>

//         <div className='row'>
//           <div className='input-field col s12'>
//             <i className="material-icons prefix">location_on</i>
//             <input className='validate' type='text' name='dropOffLocn' id='dropOffLocn' />
//             <label for='dropOffLocn'>Enter drop off location</label>
//           </div>
//         </div>

//         <div className='row'>
//           <div className='input-field col s12'>
//             <i className="material-icons prefix">date_range</i>
//             <input className='datepicker' type='text' name='pickupDate' id='pickupDate' />
//             <label for='pickupDate'>Pick Up Date</label>
//           </div>
//         </div>

//         <div className='row'>
//           <div className='input-field col s12'>
//             <i className="material-icons prefix">access_time</i>
//             <input className='timepicker' type="time" id='pickupTime' name="pickupTime" />
//             <label for='pickupTime'>Pick Up Time</label>
//           </div>
//         </div>

//         <div className='row'>
//           <div className='input-field col s12'>
//             <i className="material-icons prefix">access_time</i>
//             <input className='timepicker' type="time" id='dropOffTime' name="dropOffTime" />
//             <label for='pickupTime'>Drop off Time</label>
//           </div>
//         </div>

//         <div className='row'>
//           <div className='input-field col s12'>
//             <i className="material-icons prefix">airline_seat_recline_normal</i>
//             <input className='number' type='number' min="0" max="2" id='carSeatsRequired' />
//             <label for='carSeatsRequired'>Number of Car Seats</label>
//           </div>
//         </div>

//         <center>
//           <div className='row'>
//             <button type='submit' name='btn_search' className='col s12 btn btn-large waves-effect indigo' id='btn_search'><i
//                 className="material-icons prefix bottom"> search</i>Submit a Ride Request</button>
//           </div>
//         </center>
//       </form>
//     </div>
//   </div>
// </center>
