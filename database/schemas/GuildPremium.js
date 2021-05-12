const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({

code: {type: mongoose.SchemaTypes.String, default: null},

expiresAt: {type: mongoose.SchemaTypes.String, default: Date.now() + 2592000000},

plan: {type: mongoose.SchemaTypes.String, default: null},


  

});

module.exports = mongoose.model('premium-guild', guildConfigSchema);