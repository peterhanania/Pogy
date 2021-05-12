const mongoose = require("mongoose")

let applied =  mongoose.Schema({
  guildID: { type: String },
  userID: { type: String },
  appID: { type: Array, default: [] },
  hasApplied: { type: Boolean, default: true }
})

module.exports = mongoose.model("applied", applied)