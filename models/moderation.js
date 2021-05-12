const mongoose = require('mongoose')

const warn = mongoose.Schema({

    guildID: {type: String},
    memberID: {type: String},
    modType: {type: Array, default: []},
    warnings: {type: Array, default: []},
    warningID: {type: Array, default: []},
    moderator: {type: Array, default: []},
    date: {type: Array, default: []},
    
})

module.exports = mongoose.model('warn', warn)