const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  currentTask: {
    type: Number,
    default: 1,
  },
  lastTask: {
    type: Number,
    default: 0,
  },
  timestamp: { type: Date, required: true, default: Date },
});

module.exports = mongoose.model("Team", teamSchema);
