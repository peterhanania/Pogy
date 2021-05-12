const mongoose = require("mongoose");

const customcmd = mongoose.Schema({
  userID: {type: String},
  serverID: {type: String},
  command: {type: Array, default: []},
  response: {type: Array, default: []},
});

module.exports = mongoose.model("cc", customcmd);
