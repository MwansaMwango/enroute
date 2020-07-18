const mongoose = require("mongoose");

const connectDb = () => {
    
    // Connect to the Mongo DB
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/enroute", { useNewUrlParser: true, useUnifiedTopology: true });
    // Added { useNewUrlParser: true, useUnifiedTopology: true } to remove Depracation warnings

}


module.exports = connectDb;