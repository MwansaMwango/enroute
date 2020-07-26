const db = require("../models");

// Defining methods for the tripsController
module.exports = {
  findAll: function(req, res) {
    db.Trip
      .find(req.query)
      .sort({ departDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Trip
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    let resUserId, resRouteId;
    // Resolve user_id from passport req.user
    // req.body.user_id = req.user.id; 
    req.body.user_id = "5f1d53135a23c6554c153e14"; // hardcoded for test 
    
    // Resolve router_id from start and destination location
    // db.Trip.
    //   findOne({ from: req.body.from, to: req.body.to  })
    //   .then(dbModel => resRouteId = dbModel.route_id)
    //   .catch(err => res.status(422).json(err));
    // req.body.route_id = req.user.id; 
    req.body.route_id = "5f1d53135a23c6554c153e1e"; // hardcoded for test 
    console.log("Req.body = ", req.body)
    db.Trip
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Trip
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Trip
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
