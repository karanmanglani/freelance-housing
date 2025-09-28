const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

// Private route for any logged-in user to create a booking
router.post("/", protect, createBooking);

module.exports = router;
