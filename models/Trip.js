const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const moment = require('moment');

const TripSchema = new Schema({
  
  from: {type: String},
  to: {type: String},
  departTime: {type: String},
  // departTime: {type: String, default: moment(new Date(Date.now())).format("HH:mm")},// requires correct time format, display current time},
  departDate: {type: Date, default: new Date(Date.now())},
  freeSeats: {type: Number, default: 1},
  tripNote: {type: String},
  status: {type: String, default: "Posted"}, // Trip Status Lifecycle - Posted > Booked > Started > Completed || Expired
  carryPackage: {type: Boolean},
  tripPoints: {type: Number, default: 0}, //Number of points earned when request is fulfilled and completed
  user_id: {type: Schema.Types.ObjectId, ref: "User" }, // 1 to 1 Relationship
  request_id: {type: Schema.Types.ObjectId, ref: "Request" }, // 1 to 1 Relationship

}, { timestamps: true });

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
