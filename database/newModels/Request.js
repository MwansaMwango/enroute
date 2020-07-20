const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    departTime: {type: Date},
    departDate: {type: Date, default: new Date(Date.now())},
    hasParcels: {type: Boolean, default: false},
    seatsRequired: {type: Number, default: 1},
    isTransportVehicle: {type: Boolean, default: false},
    requestNote: {type: String},
    status: {type: String},
    trip_id: { type: Schema.Types.ObjectId, ref: "Trip" },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    route_id: { type: Schema.Types.ObjectId, ref: "Route" }

},
{
    timestamps: true
})

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;