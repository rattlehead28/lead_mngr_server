const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      maxlength: 10,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location_type: {
      type: String,
      enum: ["Country", "City", "Zip"],
      required: true,
    },
    location_string: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Created", "Contacted"],
      required: true,
    },
    communication: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Lead", leadSchema);
