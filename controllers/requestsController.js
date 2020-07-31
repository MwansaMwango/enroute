const db = require("../models");

// Defining methods for the tripsController
module.exports = {
  findAll: function (req, res) {
    db.Request.find({}) //TODO replace with passport
      .populate("user_id")
      .populate("route_id")
      .sort({ departDate: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Request.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    // Resolve user_id from passport req.user
    // req.body.user_id = req.user._id;
    req.body.user_id = req.user._id; // hardcoded for testing

    db.Request.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findMatchingTrips: function (req, res) {
    console.log(req.body);
    db.Trip.find({
      // Mandatory parameters
      from: req.body.from,
      to: req.body.to,
      freeSeats: {
        $gte: req.body.seatsRequired,
      },
      departDate : req.body.departDate,
      // Optional parameters
      $or: [
        {
          // departDate: ISODate("2020-08-10T16:00:00.000Z"),
          // departDate: req.body.departDate, // TODO Matching by Date and Time using Moment
        },
        {
          carryPackage: req.body.hasPackage,
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
    db.Request.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  acceptRequest: function (req, res) {
    db.Request.findOneAndUpdate({ _id:  ObjectId(req.params.id) }, {$set: {'status':'Confirmed'}}) //TODO add trip Id cross reference
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Request.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
