const mongoose = require("mongoose");
const stream = require("./Streams");

const schema = mongoose.Schema({
  subject: String, 
  stream: { type: mongoose.Schema.Types.ObjectId, ref: "Streams" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
});

module.exports = mongoose.model("Subjects", schema);
