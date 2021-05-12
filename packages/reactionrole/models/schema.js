const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  
  guildid: { type: String },
  msgid: { type: String},
  roleid: { type: String},
  reaction: { type: String }, 
  dm: {type: Boolean },
  option: { type: Number }
  
});

module.exports = mongoose.model('reaction', reactionSchema);