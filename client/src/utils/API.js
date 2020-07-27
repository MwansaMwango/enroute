import axios from "axios";

  // ------------------Books APIs ----------------------------
export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  
  // ------------------Trips APIs ----------------------------
  // Gets all trips
  getTrips: function() {
    return axios.get("/api/trips");
  },
  // Gets the trip with the given id
  getTrip: function(id) {
    return axios.get("/api/trips/" + id);
  },
  // Deletes the trip with the given id
  deleteTrip: function(id) {
    return axios.delete("/api/trips/" + id);
  },
  // Saves a trip to the database
  saveTrip: function(tripData) {
    return axios.post("/api/trips", tripData);
  },

    // ------------------Request Made APIs ----------------------------
  // Gets all requests
  getRequests: function() {
    return axios.get("/api/requests");
  },
  // Gets the request with the given id
  getRequest: function(id) {
    return axios.get("/api/requests/" + id);
  },
  // Deletes the request with the given id
  deleteRequest: function(id) {
    return axios.delete("/api/requests/" + id);
  },
  // Posts a request to the database
  requestRide: function(requestData) {
    return axios.post("/api/requests", requestData);
  },
    // ------------------Requests Received APIs ----------------------------
  // Gets all matching requests
  getMatchingRequests: function() {
    return axios.get("/api/matches");
  },
  // Accept the request with the given id
  acceptRequest: function(id) {
    return axios.get("/api/accept/" + id);
  },
  // Cancel /undo the accepted request with the given id
  undoAcceptRequest: function(id) {
    return axios.get("/api/undoaccept/" + id);
  },
  // Decline the matching request with the given id
  declineRequest: function(id) {
    return axios.get("/api/decline/" + id);
  },

};
