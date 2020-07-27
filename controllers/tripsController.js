const db = require("../models");

// //
// app.get("/notes", (req, res) => {
//   db.Note.find({})
//     .then(dbNote => {
//       res.json(dbNote);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/user", (req, res) => {
//   db.User.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.post("/submit", ({ body }, res) => {
//   db.Note.create(body)
//     .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/populateduser", (req, res) => {
//   db.User.find({})
//     .populate("notes")
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });
// Defining methods for the tripsController
module.exports = {
  // findAll: function(req, res) {
  //   db.Trip
  //     .find(req.query)
  //     .sort({ departDate: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  findAll: function (req, res) {
    db.Trip.find({ user_id: "5f1d53135a23c6554c153e14" })
      .populate("user_id")
      .populate("route_id")
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
    let resUserId, resRouteId;
    // Resolve user_id from passport req.user
    // req.body.user_id = req.user.id;
    req.body.user_id = "5f1d53135a23c6554c153e14"; // hardcoded for testing

    // Resolve route_id from start and destination 
    db.Route.find({
      $or: [
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
        db.Trip.create(req.body)
          .then((dbModel) => res.json(dbModel))
          .catch((err) => res.status(422).json(err));
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
