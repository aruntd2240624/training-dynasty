const mongoose = require("mongoose")

const schema = mongoose.Schema({ title: String }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model("Streams", schema)