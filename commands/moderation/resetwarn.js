const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Guild = require("../../database/schemas/Guild.js");
const Economy = require("../../models/economy.js")
const warnModel = require("../../models/moderation.js")
const mongoose = require("mongoose")
const discord = require("discord.js")
const Logging = require('../../database/schemas/logging.js')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'resetwarn',
        aliases: [ 'clearwarn', 'resetwarns','clearwarns','cw'],
        description: 'Clear all the users warns',
        category: 'Moderation',
        usage: '<user> [reason]',
        examples: [ 'kick @Peter Breaking the rules' ],
        guildOnly: true,
        userPermission: ['MANAGE_ROLES'],
      });
    }

    async run(message, args) {
let client = message.client
/*------ Guild Data ------*/
  
const settings = await Guild.findOne({
    guildId: message.guild.id
}, (err, guild) => {
    if (err) console.error(err)
    if (!guild) {
        const newGuild = new Guild({
          _id: mongoose.Types.ObjectId(),
          guildId: message.guild.id,
          guildName: message.guild.name,
          prefix: client.config.prefix,
          language: "english"
        })

        newGuild.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));

        return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
    }
});

const guildDB = await Guild.findOne({
guildId: message.guild.id
});
const language = require(`../../data/language/${guildDB.language}.json`)
  const logging = await Logging.findOne({ guildId: message.guild.id })

const mentionedMember = message.mentions.members.last()
|| message.guild.members.cache.get(args[0])


 if (!mentionedMember) {
return message.channel.send(new discord.MessageEmbed()
   .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${client.emoji.fail} | ${language.banUserValid}`)
    .setTimestamp(message.createdAt)
    .setColor(client.color.red))
}

const mentionedPotision = mentionedMember.roles.highest.position
const memberPotision = message.member.roles.highest.position

if (memberPotision <= mentionedPotision) {
return message.channel.send(new discord.MessageEmbed()
  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${client.emoji.fail} | ${language.rmPosition}`)
    .setTimestamp(message.createdAt)
    .setColor(client.color.red))
}

let reason = args.slice(1).join(' ');
if (!reason) reason = language.softbanNoReason;
if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

const warnDoc = await warnModel.findOne({
guildID: message.guild.id,
memberID: mentionedMember.id,
}).catch(err => console.log(err))

if (!warnDoc || !warnDoc.warnings.length) {
return message.channel.send(new discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${client.emoji.fail} | ${language.rmNoWarning}`)
    .setTimestamp(message.createdAt)
    .setColor(client.color.red))
}
await warnDoc.updateOne({
modType: [],
warnings: [],
warningID: [],
moderator: [],
date: [],
})

const removeEmbed = new discord.MessageEmbed()
.setDescription(`${message.client.emoji.success} | Cleared all Warn of **${mentionedMember.user.tag}** ${logging && logging.moderation.include_reason === "true" ?`\n\n**Reason:** ${reason}`:``}`)
.setColor(message.client.color.green)

message.channel.send(removeEmbed)
.then(async(s)=>{
          if(logging && logging.moderation.delete_reply === "true"){
            setTimeout(()=>{
            s.delete().catch(()=>{})
            }, 5000)
          }
        })
        .catch(()=>{});


if(logging){
  if(logging.moderation.delete_after_executed === "true"){
  message.delete().catch(()=>{})
}

const role = message.guild.roles.cache.get(logging.moderation.ignore_role);
const channel = message.guild.channels.cache.get(logging.moderation.channel)

  if(logging.moderation.toggle == "true"){
    if(channel){
    if(message.channel.id !== logging.moderation.ignore_channel){
       if(!role || role && !message.member.roles.cache.find(r => r.name.toLowerCase() === role.name)){
if(logging.moderation.warns == "true"){
  
let color = logging.moderation.color;
if(color == "#000000") color = message.client.color.yellow;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

const logEmbed = new MessageEmbed()
.setAuthor(`Action: \`Clear Warn\` | ${mentionedMember.user.tag} | Case #${logcase}`, mentionedMember.user.displayAvatarURL({ format: 'png' }))
.addField('User', mentionedMember, true)
.addField('Moderator', message.member, true)
.addField('Reason', reason, true)
.setFooter(`ID: ${mentionedMember.id}`)
.setTimestamp()
.setColor(color)

channel.send(logEmbed).catch(()=>{})

logging.moderation.caseN = logcase + 1
await logging.save().catch(()=>{})
}
      }
    }
    }
  }
}

    }
};
