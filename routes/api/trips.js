const router = require("express").Router();
const tripsController = require("../../controllers/tripsController");

// Matches with "/api/trips"
router.route("/")
  .get(tripsController.findAll)
  .post(tripsController.create);

  // Matches with "/api/matches"
router.route("/matches")
  .get(tripsController.findMatchingTrips);

// Matches with "/api/trips/:id"
router.route("/:id")
  .get(tripsController.findById)
  .put(tripsController.update)
  .delete(tripsController.remove);

module.exports = router;
