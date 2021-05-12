const mongoose = require("mongoose");

const afkSchema = mongoose.Schema({
  userID: {type: String},
  serverID: {type: String},
  reason: {type: String, default: ' '},
  oldNickname: {type: String},
  time: {type: String, default: Date.now()}
});

module.exports = mongoose.model("Afk", afkSchema);
