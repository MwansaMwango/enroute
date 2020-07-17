const mongoose = require("mongoose");
const { schema } = require("./User");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  
  users: [{ type: Schema.Types.ObjectId, ref: "User" }]

}, { timestamps: true });

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
