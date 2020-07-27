const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    departTime: {type: String},
    departDate: {type: Date, default: new Date(Date.now())},
    hasPackage: {type: Boolean, default: false},
    seatsRequired: {type: Number, default: 1},
    isTransportVehicle: {type: Boolean, default: false},
    requestNote: {type: String},
    status: {type: String, default: "Pending"},
    trip_id: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    user_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
    route_id: [{ type: Schema.Types.ObjectId, ref: "Route" }]

},
{
    timestamps: true
})

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;