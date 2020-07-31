const db = require("../models");
const moment = require("moment");
const tz = require("moment-timezone");
const { date } = require("faker");


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
const localDateOnly = function(timezone, d) {
  if (d == undefined) { d = new Date(); } // current date/time
  return Number( moment(d).tz(timezone).format("YYYYMMDD") );
}

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
      .sort({ departDate: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findMatchingTrips: function (req, res) {
    // Resolve user_id from passport req.user
    // req.body.user_id = req.user._id;
    req.body.user_id = req.user._id; // hardcoded for testing

    // Resolve route_id from start and destination
    db.Trip.find({
      // Mandatory parameters
      from: req.body.from,
      to: req.body.to,
      freeSeats: {
        $gte: req.body.freeSeats,
      },
      $or: [
        {
          // departDate: ISODate(req.body.departDate),
          // departDate: localDateOnly(req.body.departDate),
          departDate : {"$gte": new Date(req.body.departDate)}
          // "$lt": new Date("2015-07-08T00:00:00.000Z")}
   
        },
        {
        
          carryPackage: req.body.carryPackage,
        },
      ],

    })
      .then(function (dbModel) {
        res.json(dbModel[0])
        console.log("Result match =", dbModel); 
      })
      .catch((err) => res.status(422).json(err));
      
  },

  findById: function (req, res) {
    db.Trip.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    // Resolve user_id from passport req.user

    req.body.user_id = req.user._id; // add authenticated user id
     // add authenticated user id
     //Convert to date only
    //  let dateOnly = localDateOnly(req.body.departDate);
    //  req.body.departDate = dateOnly;
    console.log("dateonly ", dateOnly);
    db.Trip.create(req.body)
      .then((dbModel) => res.json(dbModel))
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
