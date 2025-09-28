const Booking = require("../models/bookingModel");
const Property = require("../models/propertyModel");

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { propertyId, slot } = req.body; // Expecting slot as an ISO 8601 date string

  if (!propertyId || !slot) {
    return res
      .status(400)
      .json({ message: "Please provide property and slot" });
  }

  const property = await Property.findById(propertyId);
  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  const newBooking = new Booking({
    property: propertyId,
    slot: new Date(slot),
    user: req.user._id,
  });

  try {
    const createdBooking = await newBooking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    // This error will be triggered if the unique index on (property, slot) is violated
    if (error.code === 11000) {
      return res.status(400).json({ message: "This slot is already booked." });
    }
    res
      .status(500)
      .json({ message: "Server error, could not create booking." });
  }
};

module.exports = { createBooking };
