const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  stickyroleID: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: null
  },
  stickyroleToggle: {
    type: String,
    required: false,
    default: false
  },
  stickyroleUser: {
    type: Array,
    required: false,
    default: []
  }
});

module.exports = mongoose.model('sticky', guildConfigSchema);