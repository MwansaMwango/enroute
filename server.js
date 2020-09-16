const connectDb = require("./config/database");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const dotenv = require("dotenv");
const cors = require("cors");

const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config({ path: ".env" });


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));

// Enable cors
app.use(cors());



// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
connectDb();

// const Pusher = require('pusher');

// const pusher = new Pusher({
//   appId : "1074079",
//   key : "29fa452f5422eea823e5",
//   secret : "b3dc2da01e2b37e2c517",
//   cluster : "ap1",
//   useTLS: true
// });

// app.post("/pusher/auth", function (req, res) {
//   console.log("channel auth hit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//   const socketId = req.body.socket_id;
//   const channel = req.body.channel_name;
//   const auth = pusher.authenticate(socketId, channel);
//   res.send(auth);
  
// });

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false, // not using https
      maxAge: 1209600000,
    }, // two weeks in milliseconds
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
