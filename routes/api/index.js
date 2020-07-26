const router = require("express").Router();
const bookRoutes = require("./books");
const tripRoutes = require("./trips");
const requestRoutes = require("./requests");

// Book routes
router.use("/books", bookRoutes);

// Trip routes
router.use("/trips", tripRoutes);

// Request  routes
router.use("/requests", requestRoutes);

module.exports = router;
