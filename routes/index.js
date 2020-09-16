const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

const Pusher = require('pusher');


// API Routes
router.use("/api", apiRoutes);

// Pusher Routes

const pusher = new Pusher({
  appId : "1074079",
  key : "29fa452f5422eea823e5",
  secret : "b3dc2da01e2b37e2c517",
  cluster : "ap1",
  useTLS: true
});

router.post("/pusher/auth", function (req, res) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
  
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
