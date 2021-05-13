const mongoose = require('mongoose');
const config = require('../../config.json');

const guildConfigSchema = mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  disabledCommands: {
    type: mongoose.SchemaTypes.Array,
    default: []
  },
  prefix: {
    type: mongoose.SchemaTypes.String,
    required: true,
    default: config.prefix || 'p!',
  },
  isPremium: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: false
  },
  premium: {
  
  redeemedBy: {
     id: {type: mongoose.SchemaTypes.String, default: null},
     tag: {type: mongoose.SchemaTypes.String, default: null},
  },

  redeemedAt: {type: mongoose.SchemaTypes.String, default: null},

  expiresAt: {type: mongoose.SchemaTypes.String, default: null},

  plan: {type: mongoose.SchemaTypes.String, default: null},
  
  },
  logChannelID: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
  modlogcolor: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "#000000"
  },
  greetChannelID: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
  farewellChannelID: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
  antiInvites: {
    type: mongoose.SchemaTypes.Boolean,
  },
  antiLinks: {
    type: mongoose.SchemaTypes.Boolean,
  },
  leaves: {
 type: mongoose.SchemaTypes.Array,
 default: []
  },
  suggestion: {

  suggestionChannelID: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: null
  },
  suggestioncolor: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "#000000"
  },
  suggestionlogChannelID: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: null
  },
  decline: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  deleteSuggestion: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: true,
  },
  description: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: `{suggestion}`
  },
  footer:{
    type: mongoose.SchemaTypes.String,
    required: false,
    default: `Suggested by {user_tag}`
  },
  timestamp: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: false,
  },
  reaction: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: `1`,
  }

  },
  report: {

  reportChannelID: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: null
  },
  reportcolor: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: "#000000"
  },
  disableUser: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: false
  },
  disableIssue: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: false
  },
  upvote: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: false
  },
    reaction: {
     type: mongoose.SchemaTypes.String,
     required: false,
     default: `1`
  },
    reportCase: {
    type: mongoose.SchemaTypes.Number,
    default: '1'
  },

  },
  dashboardLogID: {
  type: mongoose.SchemaTypes.String,
  required: false,
  default: null
  },
  cases: {
    type: mongoose.SchemaTypes.Number
  },
  language: {
    type: mongoose.SchemaTypes.String,
    default: 'english'
  },
  reactionDM: {
  type: Boolean,
  default: true
  },
  reactionLogs: {
    type: mongoose.SchemaTypes.String,
    default: null,
    required: false,
  },
  reactionColor :{
    type: mongoose.SchemaTypes.String,
    default: '#000000',
    required: false,
  },
    autoroleID: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: null
  },
  autoroleToggle: {
    type: Boolean,
    required: false,
    default: false
  },

  

});

module.exports = mongoose.model('guild', guildConfigSchema);