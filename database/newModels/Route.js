const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  
  from: {type: String},
  to: {type: String},
  via: {type: Array}, // Todo change to array
  pointsEarned: {type: Number}
      }, { timestamps: true });

const Route = mongoose.model("Route", RouteSchema);

module.exports = Route;
