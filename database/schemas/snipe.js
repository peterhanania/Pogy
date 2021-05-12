const mongoose = require('mongoose')

const snipe = mongoose.Schema({

    guildId: {type: String},
    channel: {type: String},
    message: {type: Array, default: []},
    tag: {type: Array, default: []},
    image: {type: Array, default: []},
   
})

module.exports = mongoose.model('snipe', snipe)