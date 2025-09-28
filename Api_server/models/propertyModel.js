const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    details: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Links this property to the owner who created it
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
