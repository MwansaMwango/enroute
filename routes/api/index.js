const router = require("express").Router();
const bookRoutes = require("./books");
const tripRoutes = require("./trips");
const requestRoutes = require("./requests");
const routeRoutes = require("./routes.js");
const authRoutes = require("./auth.js");
const userRoutes = require("./user.js");
const isAuthenticated = require("../../middleware/isAuthenticated.js");

// Auth  routes
router.use("/auth", authRoutes);


router.use(isAuthenticated);

// Book routes
router.use("/books", bookRoutes);

// Trip routes
router.use("/trips", tripRoutes);

// Request  routes
router.use("/requests", requestRoutes);

// Route  routes
router.use("/routes", routeRoutes);
router.use("/users", userRoutes);

module.exports = router;
