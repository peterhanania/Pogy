const mongoose = require("mongoose")

let altDetector =  mongoose.Schema({
  guildID: {type: mongoose.SchemaTypes.String,
    required: true,
    unique: true},
  altDays: {type: String, default: 7},
  altModlog: {type: String, default: null},
  allowedAlts: {type: Array, default: []},
  altAction: {type: String, default: 'none'},
  altToggle: {type: Boolean, default: false},
  notifier: {type: Boolean, default: false}
})

module.exports = mongoose.model("altDetector", altDetector)