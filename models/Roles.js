const mongoose = require("mongoose")

const schema = mongoose.Schema({
	title: String,
  level: Number
})

module.exports = mongoose.model("Roles", schema)