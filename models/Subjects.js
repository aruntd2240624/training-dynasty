const mongoose = require("mongoose");
const stream = require("./Streams");

const schema = mongoose.Schema({
  title: String,
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Subjects", schema);
