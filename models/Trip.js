const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  
  from: {type: String},
  to: {type: String},
  departTime: {type: String }, //TODO combine date and time using moment.js
  departDate: {type: Date, default: new Date(Date.now())},
  freeSeats: {type: Number, default: 1},
  tripNote: {type: String},
  status: {type: String, default: "Not started"},
  carryPackage: {type: Boolean},
  user_id: {type: Schema.Types.ObjectId, ref: "User" }, // 1 to 1 Relationship
  request_id: {type: Schema.Types.ObjectId, ref: "Request" }, // 1 to 1 Relationship

}, { timestamps: true });

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
