const db = require("../models");
const moment = require("moment");

module.exports = {


  findAll: function (req, res) { // Find all my Trips
    db.Trip.find({ user_id: req.user._id })
      .populate("user_id")
      .sort({ departDate: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  getTripsCompleted: function (req, res) { // Find all my Trips with status completed 
    db.Trip.find({ user_id: req.user._id, status: "Completed" })
      .populate("user_id")
      .sort({ departDate: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  
  findById: function (req, res) {

    db.Trip.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  
  create: function (req, res) {
    // Resolve user_id from passport req.user
    req.body.user_id = req.user._id; // hardcoded for testing

    db.Trip.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findMatchingTrips: function (req, res) {
    console.log("Trip request body!!!!!!!!!!!!!!!!", req.body)
    db.Trip.find({
      // Mandatory parameters
      from: req.body.from,
      to: req.body.to,
      freeSeats: {
        $gte: req.body.seatsRequired, // freeSeats greater than or equal to seatsRequired
      },
      departDate : req.body.departDate, // matches by date
      user_id: { 
        $ne: req.user._id, // exclude my trips
      },
      // Optional parameters
      // $or: 
      // [
      //   {
      //     // departDate: ISODate("2020-08-10T16:00:00.000Z"),
      //     // departDate: req.body.departDate, // TODO Matching by Date and Time using Moment
      //   },
      //   {
      //     carryPackage: req.body.carryPackage,
      //   }
      // ]
    })
      .then(function (dbModel) {
        res.json(dbModel);
        console.log("Trip matches =", dbModel.length);
      })
      .catch((err) => res.status(422).json(err));
  },
  findTodaysTrips: function (req, res) {
      db.Trip.find({
        departDate: moment().format("yy-MM-DD"), //must be formatted accordingly
        user_id: {
          $ne: req.user._id, // exclude my requests
        },
      })
      .then((dbModel) => {
        res.json(dbModel);
        console.log("Find todays trips hit dbmodel=", dbModel);
      })

      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Trip.findOneAndUpdate({ _id: req.params.id }, req.body) // only updates fields that are defined in the req,body, otherwise no change in DB
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Trip.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
