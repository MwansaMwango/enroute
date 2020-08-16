const db = require("../models");

module.exports = {


  findAll: function (req, res) { // Find all my Trips
    db.Trip.find({ user_id: req.user._id })
      .populate("user_id")
      .sort({ departDate: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  
  findById: function (req, res) {
    console.log("Trip req ID", req.params.id);
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
    console.log("findMatchingTrips rout hit",req.body);
    db.Trip.find({
      // Mandatory parameters
      from: req.body.from,
      to: req.body.to,
      freeSeats: {
        $gte: req.body.freeSeats,
      },
      departDate : req.body.departDate, // matches form same day
      user_id: { 
        $ne: req.user._id, // exclude my trips
      },
      // Optional parameters
      $or: [
        {
          // departDate: ISODate("2020-08-10T16:00:00.000Z"),
          // departDate: req.body.departDate, // TODO Matching by Date and Time using Moment
        },
        {
          carryPackage: req.body.carryPackage,
        }
      ]
    })
      .then(function (dbModel) {
        res.json(dbModel);
        console.log("Result matches =", dbModel.length);
      })
      .catch((err) => res.status(422).json(err));
  },
  
  update: function (req, res) {
    db.Trip.findOneAndUpdate({ _id: req.params.id }, req.body)
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
