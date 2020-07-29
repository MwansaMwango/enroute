const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Route.find()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByLocations: function (req, res) {
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
      .then((dbModel) => res.json(dbModel[0]))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Route.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Route.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Route.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Route.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
