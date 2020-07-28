const router = require("express").Router();
const routesController = require("../../controllers/routesController");

// Matches with "/api/routes"
router.route("/")
  .get(routesController.findAll)
  .post(routesController.create);

// Matches with "/api/routes/:id"
router.route("/:id")
  .get(routesController.findById)
  .put(routesController.update)
  .delete(routesController.remove);

module.exports = router;
