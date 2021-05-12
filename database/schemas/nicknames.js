const mongoose = require('mongoose');

const nickSchema = mongoose.Schema({
  
  discordId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  nicknames: {
    type: Array,
    default: [],
  },
 
});


module.exports = mongoose.model('Nickname', nickSchema);