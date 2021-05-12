const mongoose = require("mongoose")

let robSchema = mongoose.Schema({
  userID: {type: String},
  hasPadlock: {type: Boolean, default: false},
})

module.exports = mongoose.model("EcoRob", robSchema)