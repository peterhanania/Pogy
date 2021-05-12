const mongoose = require("mongoose")

let ticketSchema = mongoose.Schema({
  guildID: {type: String},
  ticketReactChannel: {type: String},
  messageID: {type: Array, default: []},
  supportRoleID: {type: String},
  categoryID: {type: String},
  ticketModlogID: {type: String},
  ticketType: {type: String, default: ''},
  ticketCase: {
    type: mongoose.SchemaTypes.Number,
    default: '1'
  },
  maxTicket: { 
    type: Number,
    default: '1'
  },
  ticketToggle: {type: String, default: false},
  ticketWelcomeMessage: {type: String, default: `Hey {user} Welcome to your ticket!\n\nThank you for creating a ticket, the support team will be with you shortly\n\nIn the mean time, please explain your issue below`},
  ticketPing: {type: String, default: false},
  ticketClose: {type: String, default: false},
  ticketTimestamp: {type: String, default: false},
  ticketLogColor: {type: String, default: `#000000`},
  ticketEmbedColor: {type: String, default: `#000000`},
  ticketTitle: {type: String, default: `Server Tickets`},
  ticketDescription: {type: String, default: `Please react with 🎫 to open a ticket!`},
  ticketFooter: {type: String, default: `Powered by Pogy.xyz`},
  ticketReaction: {type: String, default: `🎫`},
  ticketWelcomeColor: {type: String, default: `#000000`},
  requireReason: {type: String, default: true},
  ticketCustom: {type: String, default: "false"}

})

module.exports = mongoose.model('ticketSchema', ticketSchema)