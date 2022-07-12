const mongoose = require("mongoose")


const schema = mongoose.Schema({
  title: String, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
});

module.exports = mongoose.model("Streams", schema)