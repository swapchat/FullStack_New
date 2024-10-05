const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true, // User must be associated with a record
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the date to now when created
  },
});

module.exports = mongoose.model("Record", RecordSchema);
