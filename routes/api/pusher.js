const express = require("express");
const router = express.Router();
// const PushNotifications = require("@pusher/push-notifications-server");
// const beamsClient = new PushNotifications({
//   instanceId: "6af2ffd6-7acf-4ff5-9099-45bd1624be39",
//   secretKey: "F094DE9101E2FA71FAECD085E50660325C9B7BA96424EBBB38F90E3277C9CFA3",
//   // instanceId: "0bb3f3ca-f205-4863-a264-e0e2264bc4bf",
//   // secretKey: "7AAD3F24D5B9C2CDF0FF9093EE725E0D5270BD6B67ACD616CB77499FFE95E184",
// });
// const Pusher = require('pusher');

// const pusher = new Pusher({
//   appId : "1074079",
//   key : "29fa452f5422eea823e5",
//   secret : "b3dc2da01e2b37e2c517",
//   cluster : "ap1",
//   useTLS: true
// });

// router.post("/auth", function (req, res) {
//   console.log("channel auth hit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//   const socketId = req.body.socket_id;
//   const channel = req.body.channel_name;
//   const auth = pusher.authenticate(socketId, channel);
//   res.send(auth);
  
// });

// --- BEAMS ------
// router.get("/beams-auth", function (req, res) {
//   // Do your normal auth checks here 🔒
//   // const userId = '' // get it from your auth system

//   // Convert req.user._id object to string
//   const userId = JSON.stringify(req.user._id); // get it from your auth system

//   const userIDInQueryParam = req.query["user_id"];

//   // Check for variable type, must be String
//   //   console.log("Type of userIDInQueryParam = ", typeof userIDInQueryParam);
//   //   console.log("Type of userId = ", typeof userId);

//   if (req.user._id != userIDInQueryParam) {
//     res.send(401, "Inconsistent request");
//   } else {
//     const beamsToken = beamsClient.generateToken(userId);
//     res.send(JSON.stringify(beamsToken));
//   }
// });

// /*You should now be able to associate devices with users in your application. 
// This will allow you to send notifications to all devices belonging to a 
// particular user by publishing to their user ID. Use one of the Beams server 
// SDKs to publish to your users:
//  */

// beamsClient
//   //   .publishToUsers(["user-001", "user-002"], { // specify your users
//   .publishToUsers(["5f5364c6ac0d0f002aefcc0a", "user-002"], {
//     // specify your users
//     apns: {
//       aps: {
//         alert: {
//           title: "Hello",
//           body: "Hello, world!",
//         },
//       },
//     },
//     fcm: {
//       notification: {
//         title: "Hello",
//         body: "Hello, world!",
//       },
//     },
//     web: {
//       notification: {
//         title: "Hello",
//         body: "Hello, world!",
//       },
//     },
//   })
//   .then((publishResponse) => {
//     console.log("Just published:", publishResponse.publishId);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

module.exports = router;
