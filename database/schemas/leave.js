const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  leaveToggle: {
    type: mongoose.SchemaTypes.String,
    default: false,
  },
  leaveDM: {
    type: mongoose.SchemaTypes.String,
    default: false
  },
  leaveChannel:{
    type: mongoose.SchemaTypes.String,
    default: null,
  },
  leaveMessage:{
    type: mongoose.SchemaTypes.String,
    default: `{user_tag} just left {guild}, we now have {memberCount} Members!`,
  },
  leaveEmbed:{
    type: mongoose.SchemaTypes.String,
    default: false,
  },

  embed: {

  title: {
    type: mongoose.SchemaTypes.String,
    default: `Goodbye!`,
    },
     
  titleURL: {
    type: mongoose.SchemaTypes.String,
    default: ``,
    },

    description: {
    type: mongoose.SchemaTypes.String,
    default: `{user_tag} just left {guild}, we now have {memberCount} Members!`,
    },
    footer: {
    type: mongoose.SchemaTypes.String,
    default: ``,
    },
    footerIcon: {
    type: mongoose.SchemaTypes.String,
    default: ``,
    },
    color: {
    type: mongoose.SchemaTypes.String,
    default: `#000000`,
    },
    timestamp :{
    type: mongoose.SchemaTypes.String,
    default: false,
    },

    thumbnail: {
    type: mongoose.SchemaTypes.String,
    default: ``,
    },

    author: {

    name: {
    type: mongoose.SchemaTypes.String,
    default: ``,
    },

    
    url: {
    type: mongoose.SchemaTypes.String,
    default: ``,
    },

    icon: {
    type: mongoose.SchemaTypes.String,
    default: ``,
    },
    
    },

  },


});

module.exports = mongoose.model('leave', guildConfigSchema);