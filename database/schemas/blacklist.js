const mongoose = require('mongoose');

const blacklistSchema = mongoose.Schema({
  discordId: {
    type: String,
  },
  guildId: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  isBlacklisted: {
    type: Boolean,
    required: false
  },
  reason: {
    type: String,
    required: false
  },
   length: {
     type: Date,
   }
});


module.exports = mongoose.model('Blacklist', blacklistSchema);