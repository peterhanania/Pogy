const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  badges: {
  type: Array,
  default: []
  },
  rep: {
    type: Number,
    required: false,
  },
  lastVoted: { type: Number },
  votes: { type: Number }
});


module.exports = mongoose.model('User', userSchema);