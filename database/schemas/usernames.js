const mongoose = require('mongoose');

const uSchema = mongoose.Schema({
  
  discordId: {
    type: String,
    required: true,
  },
  usernames: {
    type: Array,
    default: [],
  },
 
});


module.exports = mongoose.model('Username', uSchema);