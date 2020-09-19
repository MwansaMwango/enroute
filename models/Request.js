const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const moment = require("moment");

const RequestSchema = new Schema(
  {
    
    from: { type: String },
    to: { type: String },
    departTime: {type: String},
    // departTime: {type: String, default: moment(new Date(Date.now())).format("HH:mm")},// requires correct time format, display current time},
    departDate: { type: Date, default: new Date(Date.now()) },
    hasPackage: { type: Boolean, default: false },
    seatsRequired: { type: Number, default: 1 },
    isTransportVehicle: { type: Boolean, default: false },
    requestNote: { type: String },
    status: { type: String, default: "Pending" }, // Request Status Lifecycle - Pending > Booked > Started > Completed || Expired
    trip_id: { type: Schema.Types.ObjectId, ref: "Trip" }, // 1 to 1 Relationship
    user_id: { type: Schema.Types.ObjectId, ref: "User" }, // 1 to 1 Relationship
    driver_id: { type: Schema.Types.ObjectId, ref: "User" }, // 1 to 1 Relationship with User

  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
