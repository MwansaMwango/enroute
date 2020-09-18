const db = require("../models");
const PushNotifications = require("@pusher/push-notifications-server");
// const beamsClient = new PushNotifications({
//   // instanceId: "6af2ffd6-7acf-4ff5-9099-45bd1624be39",
//   // secretKey: "8B9AFA8838E2D7A271D34AF7407DF93B7F7514A1F80DDE49DB12AF8F845C4B3C",
//   instanceId: "0bb3f3ca-f205-4863-a264-e0e2264bc4bf",
//   secretKey: "7AAD3F24D5B9C2CDF0FF9093EE725E0D5270BD6B67ACD616CB77499FFE95E184",
// });
const Pusher = require('pusher');

const pusher = new Pusher({
  appId : "1074079",
  key : "29fa452f5422eea823e5",
  secret : "b3dc2da01e2b37e2c517",
  cluster : "ap1"
});



// Defining methods for the request controller
module.exports = {
  findAll: function (req, res) {
    console.log("findAll my requests");
    db.Request.find({ user_id: req.user.id }) //by user id from req.user passport obj
      .populate("user_id") // include current user details TODO - exclude password
      .populate("driver_id") // include confirmed driver details TODO - exclude password
      .sort({ departDate: -1 }) //most recent first
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Request.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    req.body.user_id = req.user._id; // get current user from passport object

    db.Request.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findMatchingRequests: function (req, res) {
    // load this in Requests Received page for driver req.body is an instance of 1 trip
    console.log(
      "Run findMatchingRequests using Trip Data, req.body= ",
      req.body
    );
    db.Request.find({
      // find one first come first serve
      // Mandatory parameters
      from: req.body.from,
      to: req.body.to,
      seatsRequired: {
        $lte: req.body.freeSeats, // seatsRequired less than or equal to freeSeats
      },
      departDate: req.body.departDate,
      user_id: {
        $ne: req.user._id, // exclude my requests
      },
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
    req.body.status = "Booked"; // change status booking to booked
    req.body.driver_id = req.user.id; // attach driver id to request record
    console.log("update hit...req.body = ", req.body);

    db.Request.findOneAndUpdate({ _id: req.params.id }, req.body) //only updates different fields
      .then((dbModel) => {
        res.json(dbModel);
        let requestorId = dbModel.user_id; // Get requestor ID
        db.Trip.findOneAndUpdate(
          // bind request_id to trip record and change trip status to "Booked"
          { _id: req.body.trip_id },
          { request_id: req.params.id, status: "Booked" }
        ).then((dbModel) => {
          // /*You should now be able to associate devices with users in your application. 
          // This will allow you to send notifications to all devices belonging to a 
          // particular user by publishing to their user ID. Use one of the Beams server 
          // SDKs to publish to your users:
          // */
          // //May not be required?
          // beamsClient
          //   //   .publishToUsers(["user-001", "user-002"], { // specify your users
          //   .publishToUsers(["5f3901143505bf79fce1d50d"], {
          //     // specify your users
          //     apns: {
          //       aps: {
          //         alert: {
          //           title: "Hello",
          //           body: "Request Accepted!",
          //         },
          //       },
          //     },
          //     fcm: {
          //       notification: {
          //         title: "Hello",
          //         body: "Request Accepted!",
          //       },
          //     },
          //     web: {
          //       notification: {
          //         title: "Hello",
          //         body: "Request Accepted!",
          //       },
          //     },
          //   })
          //   .then((publishResponse) => {
          //     console.log("Just published:", publishResponse.publishId);
          //   })
          //   .catch((error) => {
          //     console.error("Error:", error);
          //   });
          // // end of beams pusher notification

          //----- CHANNEL TRIGGER ---------
          pusher.trigger('private-user-' + requestorId, 'request-booked', {"message": "Booking Accepted"});

          console.log("Updated trip record with request_id", dbModel);
        });
      })
      .catch((err) => res.status(422).json(err));
  },
  undoAccept: function (req, res) {
    console.log("undo route hit1", req.body);
    req.body.status = "Pending"; // change status booking to Pending
    req.body.driver_id = null; //mongoDB does not process empty strings
    let tempTrip_id = req.body.trip_id; // copy trip_id for use Trip collection query
    req.body.trip_id = null; // dettach trip_id
    db.Request.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => {
        res.json(dbModel);
        db.Trip.findOneAndUpdate(
          // bind request_id to trip record and change trip status back to Posted
          { _id: tempTrip_id },
          { request_id: null, status: "Posted" }
        ).then((dbModel) => {
          console.log("UndoAccept trip record with request_id", dbModel);
        });
      })
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
