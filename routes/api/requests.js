const router = require("express").Router();
const requestsController = require("../../controllers/requestsController");


// Matches with "/api/requests"
router.route("/")
  .get(requestsController.findAll)
  .post(requestsController.create);

  // Matches with "/api/requests/matches"
  router.route("/matches")
  .post(requestsController.findMatchingRequests);
  // Accept request and confirm booking with "/api/requests/accept/:id"
  router.route("/accept/:id")
  .put(requestsController.update);
  
  // Undo request and confirm booking with "/api/requests/accept/:id"
  router.route("/undoaccept/:id")
  .put(requestsController.undoAccept);
  
// Matches with "/api/requests/:id"
router.route("/:id")
  .get(requestsController.findById)
  .put(requestsController.update)
  .delete(requestsController.remove);

module.exports = router;
