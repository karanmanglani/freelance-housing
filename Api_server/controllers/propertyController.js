const Property = require("../models/propertyModel");
const Booking = require("../models/bookingModel");

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Owner
const createProperty = async (req, res) => {
  const { name, price, location, imageUrl, details } = req.body;

  const property = new Property({
    name,
    price,
    location,
    imageUrl,
    details,
    owner: req.user._id,
  });

  const createdProperty = await property.save();
  res.status(201).json(createdProperty);
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getAllProperties = async (req, res) => {
  const properties = await Property.find({});
  res.json(properties);
};

// @desc    Get properties for the logged-in owner
// @route   GET /api/properties/myproperties
// @access  Private/Owner
const getMyProperties = async (req, res) => {
  const properties = await Property.find({ owner: req.user._id });
  res.json(properties);
};

// @desc    Get a single property by ID and its booked slots
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    // Get today's date at the start of the day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get the date 3 days from now
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    // Find all bookings for this property within the next 3 days
    const bookings = await Booking.find({
      property: property._id,
      slot: { $gte: today, $lt: threeDaysFromNow },
    });

    // Extract just the date strings of the booked slots
    const bookedSlots = bookings.map((booking) => booking.slot.toISOString());

    res.json({ property, bookedSlots });
  } else {
    res.status(404).json({ message: "Property not found" });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Owner
const deleteProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    // Security check: Make sure the user deleting the property is the owner
    if (property.owner.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this property" });
    }
    await property.deleteOne();
    res.json({ message: "Property removed" });
  } else {
    res.status(404).json({ message: "Property not found" });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  deleteProperty,
};
