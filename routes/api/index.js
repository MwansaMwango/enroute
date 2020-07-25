const router = require("express").Router();
const bookRoutes = require("./books");
const tripRoutes = require("./trips");

// Book routes
router.use("/books", bookRoutes);

// Trip routes
router.use("/trips", tripRoutes);

module.exports = router;
