const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  
  departTime: {type: Date},
  departDate: {type: Date, default: new Date(Date.now())},
  freeSeats: {type: Number, default: 1},
  tripNote: {type: String},
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  route_id: { type: Schema.Types.ObjectId, ref: "Route" }

}, { timestamps: true });

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
