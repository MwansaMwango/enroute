const router = require("express").Router();
const tripsController = require("../../controllers/tripsController");

// Matches with "/api/trips"
router.route("/")
  .get(tripsController.findAll)
  .get(tripsController.getTripsCompleted)
  .post(tripsController.create);

 // Matches with "/api/trips/today"
 router.route("/today")
 .get(tripsController.findTodaysTrips);
 
  router.route("/matches")
  .post(tripsController.findMatchingTrips);

// Matches with "/api/trips/:id"
router.route("/:id")
  .get(tripsController.findById)
  .put(tripsController.update)
  .delete(tripsController.remove);

module.exports = router;
