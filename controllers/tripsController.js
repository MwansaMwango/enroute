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

  findAll: function (req, res) { // Find all my Trips
    db.Trip.find({ user_id: req.user._id })
      .populate("user_id")
      .sort({ departDate: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // findMatchingTrips: function (req, res) {
  //   // Resolve user_id from passport req.user
  //   // req.body.user_id = req.user._id;
  //   req.body.user_id = req.user._id; // hardcoded for testing

  //   // Resolve route_id from start and destination
  //   db.Trip.find({
  //     // Mandatory parameters
  //     from: req.body.from,
  //     to: req.body.to,
  //     freeSeats: {
  //       $gte: req.body.seatsRequired,
  //     },
  //     $or: [
  //       {
  //         // departDate: ISODate(req.body.departDate),
  //         // departDate: localDateOnly(req.body.departDate),
  //         departDate : {"$gte": new Date(req.body.departDate)}
  //         // "$lt": new Date("2015-07-08T00:00:00.000Z")}
   
  //       },
  //       {
  //          carryPackage: req.body.hasPackage,
  //       },
  //     ],

  //   })
  //     .then(function (dbModel) {
  //       res.json(dbModel.length)
  //       console.log("No of Result matches =", dbModel.length); 
  //     })
  //     .catch((err) => res.status(422).json(err));
      
  // },

  findById: function (req, res) {
    console.log("Trip req ID", req.params.id);
    db.Trip.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // create: function (req, res) {
  //   // Resolve user_id from passport req.user

  //   req.body.user_id = req.user._id; // add authenticated user id
  //    // add authenticated user id
  //    //Convert to date only
  //   //  let dateOnly = localDateOnly(req.body.departDate);
  //   //  req.body.departDate = dateOnly;

  //   db.Trip.create(req.body)
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },

  create: function (req, res) {
    // Resolve user_id from passport req.user
    // req.body.user_id = req.user._id;
    req.body.user_id = req.user._id; // hardcoded for testing

    db.Trip.create(req.body)
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
