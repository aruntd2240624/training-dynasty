const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: { type: String, required: true, index: { unique: true } },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CourseType", schema);
