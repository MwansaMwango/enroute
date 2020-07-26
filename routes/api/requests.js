const router = require("express").Router();
const requestsController = require("../../controllers/requestsController");

// Matches with "/api/requests"
router.route("/")
  .get(requestsController.findAll)
  .post(requestsController.create);

// Matches with "/api/requests/:id"
router.route("/:id")
  .get(requestsController.findById)
  .put(requestsController.update)
  .delete(requestsController.remove);

module.exports = router;
