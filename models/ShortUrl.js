const mongoose = require('mongoose')
const shortId = require('shortid')
let kaka = shortId.generate

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
   
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
   guildID: String,
   memberID: String,
   
  
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
