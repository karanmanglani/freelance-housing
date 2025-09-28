const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Property",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    slot: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// IMPORTANT: This creates a compound unique index.
// It ensures that a single property can only have one booking for a specific time slot.
// This is our database-level concurrency control to prevent double bookings.
bookingSchema.index({ property: 1, slot: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
