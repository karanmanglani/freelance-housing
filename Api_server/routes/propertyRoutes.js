const express = require("express");
const router = express.Router();
const {
  createProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  deleteProperty,
} = require("../controllers/propertyController");
const { protect, authorizeOwner } = require("../middleware/authMiddleware");

// Public route to get all properties
router.get("/", getAllProperties);

// Private owner route to get their own properties
router.get("/myproperties", protect, authorizeOwner, getMyProperties);

// Private owner route to create a property
router.post("/", protect, authorizeOwner, createProperty);

// Public route to get a single property
router.get("/:id", getPropertyById);

// Private owner route to delete a property
router.delete("/:id", protect, authorizeOwner, deleteProperty);

module.exports = router;
