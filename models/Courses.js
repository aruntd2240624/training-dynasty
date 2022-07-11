const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  type: { type: mongoose.Schema.Types.ObjectId, ref: "CourseType" },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subjects" }],
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Courses", schema);
