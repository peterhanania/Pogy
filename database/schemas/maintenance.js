const mongoose = require('mongoose')

const maintenance = mongoose.Schema({

    maintenance: {type: String, default: 'maintenance'},
    toggle: {type: String, default: 'false'},
   
})

module.exports = mongoose.model('maintenance', maintenance)