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
  }
};
