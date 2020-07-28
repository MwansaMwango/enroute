const db = require("../models");

// Defining methods for the tripsController
module.exports = {
  findAll: function (req, res) {
    db.Request.find({ user_id: "5f1d53135a23c6554c153e14" })
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
    // req.body.user_id = req.user.id;
    req.body.user_id = "5f1d53135a23c6554c153e14"; // hardcoded for testing

    // Resolve route_id from start and destination
    db.Route.find({
      $or: [
        // swaps to and from to ensure both cases are captured
        {
          from: req.body.from,
          to: req.body.to,
        },
        {
          from: req.body.to,
          to: req.body.from,
        },
      ],
    })
      .then(function (dbModel) {
        req.body.route_id = dbModel[0]._id;
        db.Request.create(req.body)
          .then((dbModel) => res.json(dbModel))
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Request.findOneAndUpdate({ _id: req.params.id }, req.body)
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
