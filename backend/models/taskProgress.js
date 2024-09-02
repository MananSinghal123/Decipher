const mongoose = require("mongoose");

const taskProgressSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  currentTask: {
    type: Number,
    default: 1, 
  },
  lastTask: {
    type: Number,
    default: 0, 
  },
});

module.exports = mongoose.model("TaskProgress", taskProgressSchema);
