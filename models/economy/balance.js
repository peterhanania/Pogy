const mongoose = require("mongoose")

let bal = mongoose.Schema({
  user: { type: String },
  balance: { type: Number, default: 0 }
})

module.exports = mongoose.model("balance", bal)