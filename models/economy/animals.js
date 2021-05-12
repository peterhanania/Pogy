const mongoose = require("mongoose")

let bal = mongoose.Schema({
  user: { type: String },
  Inventory: { type: Object },
})

module.exports = mongoose.model("ecoanimal", bal)