const mongoose = require("mongoose")

let appID = mongoose.model({
  guildID: { type: String },
  userID: { type: String },
  appID: { type: String }
})

module.exports = mongoose.model("appID", appID)