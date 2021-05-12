const mongoose = require('mongoose')

const esnipe = mongoose.Schema({

    guildId: {type: String},
    channel: {type: String},
    oldmessage: {type: Array, default: []},
    newmessage: {type: Array, default: []},
    id: {type: Array, default: []},
    url: {type: Array, default: []},
   
})

module.exports = mongoose.model('edit-snipe', esnipe)