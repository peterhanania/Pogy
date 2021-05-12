const mongoose = require('mongoose')

const mute = mongoose.Schema({

    guildID: {type: String},
    memberID: {type: String},
    length: {type: Date, default: Date.now()},
    memberRoles: {type: Array, default: []},
    
})

module.exports = mongoose.model('mute', mute)