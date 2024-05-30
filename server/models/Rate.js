const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Rate", RateSchema);
