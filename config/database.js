const mongoose = require("mongoose");

const connectDb = () => {
    
    // Connect to the Mongo DB
    // mongoose.connect("mongodb://bambo:Mlab0044$@ds161794.mlab.com:61794/heroku_bzvqq08h" || "mongodb://localhost/enroute", { useNewUrlParser: true, useUnifiedTopology: true });
    // mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/enroute", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connect(process.env.DB_URI || "mongodb://localhost/enroute", { useNewUrlParser: true, useUnifiedTopology: true });
    // Added { useNewUrlParser: true, useUnifiedTopology: true } to remove Depracation warnings

}


module.exports = connectDb;