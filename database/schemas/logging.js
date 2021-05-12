const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  moderation: {

  mute_role: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: null
  },

  delete_after_executed: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: false
  },
  delete_reply: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: false
  },
  include_reason: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: false
  },
  remove_roles: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: false
  },
  ban_action: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "1"
  },
  kick_action: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "1"
  },
  warn_action: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "1"
  },
  mute_action: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "1"
  },
  ban_message: {

    toggle: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: false
    }, 
    message: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: null
    }

  },
  auto_punish: {
    toggle: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: false
    },
    amount: {
     type: mongoose.SchemaTypes.Number,
     required: false,
     default: 1
    },
    punishment: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "1"
    },
    dm: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "1"
    },
     
  },

  channel: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: null
  },
  caseN: {
     type: mongoose.SchemaTypes.Number,
     required: false,
     default: 1
  },
  ignore_channel: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: null
  },

  ignore_role: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: null
  },

  color: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "#000000"
  },
  toggle: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: false
  },
  
  ban: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  kick: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    role: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    purge: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    lock: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    warns: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    mute: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    slowmode: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    nicknames: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  
  },

    server_events: {

  channel: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: null
  },


  color: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "#000000"
  },
  toggle: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: false
  },
  
  voice: {

  join: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  move: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  leave: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },

  },

  channel_created: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  channel_update: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    channel_delete: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    role_create: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    role_update: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    guild_update: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    emoji_update: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    member_join: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    member_leave: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  
  },
    member_events: {

  channel: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: null
  },
  color: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "#000000"
  },
  toggle: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: false
  },
  
  role_update: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  name_change: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },

  
  },

    message_events: {

  channel: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: null
  },
  color: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "#000000"
  },
  toggle: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: false
  },
  
  deleted: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  edited: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    purged: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
    ignore: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  
  },
  

});

module.exports = mongoose.model('logging', guildConfigSchema);