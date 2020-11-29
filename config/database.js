const mongoose = require("mongoose");

const connectDb = () => {
  // Connect to the Mongo DB
  // mongoose.connect("mongodb://bambo:Mlab0044$@ds161794.mlab.com:61794/heroku_bzvqq08h" || "mongodb://localhost/enroute", { useNewUrlParser: true, useUnifiedTopology: true });
  // mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/enroute", { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose
    .connect(process.env.DB_URI || "mongodb://localhost:27017/enroute", {
      //.connect( "mongodb://localhost:27017/enroute" || process.env.DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      // added to remove unhandled promise error if no network connection
      () => {
        console.log("Database Successfully Connected");
      },
      (error) => {
        console.log(error);
      }
    );
  // Added { useNewUrlParser: true, useUnifiedTopology: true } to remove Depracation warnings
};

module.exports = connectDb;
