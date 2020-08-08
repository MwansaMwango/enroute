const db = require("../models");

// Defining methods for the request controller
module.exports = {
  findAll: function (req, res) {
    console.log("route hit");
    db.Request.find({ user_id: req.user.id }) //by user id from req.user passport obj
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

  findMatchingRequests: function (req, res) {
    // load this in Requests Received page for driver req.body is an instance of 1 trip
    console.log(
      "Run findMatchingRequests, Post, Trip Data, req.body= ",
      req.body
    );
    db.Request.find({
      // find one first come first serve
      // Mandatory parameters
      from: req.body.from,
      to: req.body.to,
      seatsRequired: {
        $lte: req.body.freeSeats,
      },
      // departDate : req.body.departDate,
      // Optional parameters
      // $or: [
      //   {
      //     // departDate: ISODate("2020-08-10T16:00:00.000Z"),
      //     // departDate: req.body.departDate, // TODO Matching by Date and Time using Moment
      //   },
      //   {
      //     hasPackage: req.body.carryPackage
      //   }
      // ]
    })
      .populate("user_id")
      .sort({ departDate: -1 })
      .then(function (dbModel) {
        res.json(dbModel);
        console.log("Request matches =", dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  update: function (req, res) {
    db.Request.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  acceptRequest: function (req, res) {
    req.body.status = "Confirmed"; // change status booking to comfirmed
    console.log("update hit...req.body = ", req.body);
    // req.body.driver_id = req.user_id // attach driver
    db.Request.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  undoAccept: function (req, res) {
    console.log("undo route hit");
    req.body.status = "Pending"; // change status booking to comfirmed
    // req.body.driver_id = req.user_id // attach driver
    db.Request.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // decline: function (req, res) {
  //   req.body.status = "Comfirmed" // change status booking to comfirmed
  //   // req.body.driver_id = req.user_id // attach driver
  //   db.Request.findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },
  // acceptRequest: function (req, res) {
  //   db.Request.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //         $push: req.body,
  //     },
  //     { new: true, runValidators: true }
  // ).then((updated) => {
  //     res.json({
  //         data: updated,
  //     });
  // });

  remove: function (req, res) {
    db.Request.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
