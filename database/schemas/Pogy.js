const mongoose = require('mongoose');

const SlayBotSchema = mongoose.Schema({
  news: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  tag:{
    type: mongoose.SchemaTypes.String,
    required: true,
  },    
 time:{
  type: mongoose.SchemaTypes.String,
  required: true,
 }
});

module.exports = mongoose.model('PogyNews', SlayBotSchema);