const router = require("express").Router();
const bookRoutes = require("./books");
const tripRoutes = require("./trips");
const requestRoutes = require("./requests");
const routeRoutes = require("./routes.js");

// Book routes
router.use("/books", bookRoutes);

// Trip routes
router.use("/trips", tripRoutes);

// Request  routes
router.use("/requests", requestRoutes);

// Route  routes
router.use("/routes", routeRoutes);

module.exports = router;
