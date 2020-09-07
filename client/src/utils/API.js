import axios from "axios";

// ------------------Books APIs ----------------------------
export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },

  // ------------------Trips APIs ----------------------------

  // Gets all my trips
  getTrips: function () {
    return axios.get("/api/trips");
  },
  // Gets all my trips with status Complete
  getTripsCompleted: function () {
    return axios.get("/api/trips");
  },
  // Gets all matching trips
  findMatchingTrips: function (requestData) {
    return axios.post("/api/trips/matches", requestData);
  },
  // Gets the trip with the given id
  getTrip: function (id) {
    return axios.get("/api/trips/" + id);
  },
  // Deletes the trip with the given id
  deleteTrip: function (id) {
    return axios.delete("/api/trips/" + id);
  },
  // Saves a trip to the database
  saveTrip: function (tripData) {
    return axios.post("/api/trips", tripData);
  },
  // Update a trip to the database
  updateTrip: function (id, tripData) {
    return axios.put("/api/trips/" + id, tripData);
  },

  // ------------------Request Made APIs ----------------------------
  // Posts a request to the database
  requestRide: function (requestData) {
    return axios.post("/api/requests", requestData);
  },

  // Update a request to the database
  updateRequest: function (id, requestData) {
    return axios.put("/api/requests/" + id, requestData);
  },
  // Gets all matching requests for a trip
  findMatchingRequests: function (tripData) {
    return axios.post("/api/requests/matches", tripData);
  },

  // Gets all requests
  getRequests: function () {
    return axios.get("/api/requests");
  },
  // Gets the request with the given id
  getRequest: function (id) {
    return axios.get("/api/requests/" + id);
  },
  // Deletes the request with the given id
  deleteRequest: function (id) {
    return axios.delete("/api/requests/" + id);
  },

  // ------------------Requests Received APIs ----------------------------

  // Accept the request with the given id
  acceptRequest: function (id, trip_idObject) {
    return axios.put("/api/requests/accept/" + id, trip_idObject);
  },
  // Cancel /undo the accepted request with the given id and update trip_id field
  undoAcceptRequest: function (id, trip_idObject) {
    console.log("API =  ", trip_idObject);
    return axios.put("/api/requests/undoaccept/" + id, trip_idObject);
  },

  // Decline the matching request with the given id
  declineRequest: function (id) {
    return axios.put("/api/requests/decline/" + id);
  },
  // ------------------Requests Created APIs ----------------------------

  // Call driver who accepted the request with the given id
  callDriver: function (id) {
    return axios.get("/api/calldriver/" + id);
  },
  // Email driver who accepted request with the given id
  emailDriver: function (id) {
    return axios.get("/api/emaildriver/" + id);
  },
  // Cancel the request with the given id
  cancelRequest: function (id) {
    return axios.get("/api/cancelrequest/" + id);
  },
  // ------------------Routes APIs ----------------------------
  // Gets all routes
  getRoutes: function () {
    return axios.get("/api/routes");
  },
  // -----------------Notification APIs------------------------
  // Send Booking Accepted Notification
  sendAcceptBookingNotif: function (subscriberId) { // takes in user_id
    let endpoint =
      "https://api.ravenhub.io/company/dahvfkvQhg/subscribers/" +
      subscriberId +
      "/events/NCEU6FZHKl";

      return axios.post(
      endpoint,
      { priority: "Critical" },
      {
        headers: { "Content-type": "application/json" },
      }
    );
  },
};
