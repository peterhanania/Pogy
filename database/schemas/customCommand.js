const mongoose = require('mongoose');

const customCommandSchema = mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  json: {
    type: mongoose.SchemaTypes.String,
    default: false,
  },
  content: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  title: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
    description: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
    color: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
    footer: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
    thumbnail: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
    image: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
    timestamp: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },

});

module.exports = mongoose.model('customCommand', customCommandSchema);