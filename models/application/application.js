const mongoose = require("mongoose")

const app = mongoose.Schema({
  guildID: { 
    type: String 
  },
  questions: { 
    type: Array, 
    default: [] 
  },
  appToggle: {
     type: Boolean, 
     default: false 
  },
  appLogs: { 
    type: String, 
    default: null
  },
  add_role: {
     type: String, 
     default: null
  },
  remove_role: {
     type: String, 
     default: null 
  },
  dm: { 
    type: Boolean, 
    default: true
  },
})

module.exports = mongoose.model('app', app)