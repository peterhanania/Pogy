const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Guild = require("../../database/schemas/Guild.js");
const Economy = require("../../models/economy.js")
const warnModel = require("../../models/moderation.js")
const mongoose = require("mongoose")
const Logging = require('../../database/schemas/logging.js')
const discord = require("discord.js")
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'removewarn',
        aliases: [ 'rw', 'removewarns'],
        description: 'Remove a certain users warn',
        category: 'Moderation',
        usage: '<user> [ID]',
        examples: [ 'rw @peter iasdjas' ],
        guildOnly: true,
        userPermission: ['MANAGE_ROLES'],
          });
    }

    async run(message, args) {
let client = message.client

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
  const logging = await Logging.findOne({ guildId: message.guild.id })
const guildDB = await Guild.findOne({
guildId: message.guild.id
});
const language = require(`../../data/language/${guildDB.language}.json`)


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

let reason = args.slice(2).join(' ');
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

let warningID = args[1]
if(!warningID) return message.channel.send(new discord.MessageEmbed()
 .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${client.emoji.fail} | ${language.rmWarnInvalid} `)
    .setTimestamp(message.createdAt)
    .setColor(client.color.red))

let check = warnDoc.warningID.filter(word => args[1] === word);

if(!warnDoc.warningID.includes(warningID)) return message.channel.send(new discord.MessageEmbed()
 .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${client.emoji.fail} | ${language.rmWarnInvalid} `)
    .setTimestamp(message.createdAt)
    .setColor(client.color.red))

if(!check) return message.channel.send(new discord.MessageEmbed()
 .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${client.emoji.fail} | ${language.rmWarnInvalid} `)
    .setTimestamp(message.createdAt)
    .setColor(client.color.red))

if (check.length < 0) {
return message.channel.send(new discord.MessageEmbed()
 .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${client.emoji.fail} | ${language.rmWarnInvalid} `)
    .setTimestamp(message.createdAt)
    .setColor(client.color.red))
}
let toReset = warnDoc.warningID.length 

//warnDoc.memberID.splice(toReset - 1, toReset !== 1 ? toReset - 1 : 1)
//warnDoc.guildID.splice(toReset - 1, toReset !== 1 ? toReset - 1 : 1)
warnDoc.warnings.splice(toReset - 1, toReset !== 1 ? toReset - 1 : 1)
warnDoc.warningID.splice(toReset - 1, toReset !== 1 ? toReset - 1 : 1)
warnDoc.modType.splice(toReset - 1, toReset !== 1 ? toReset - 1 : 1)
warnDoc.moderator.splice(toReset - 1, toReset !== 1 ? toReset - 1 : 1)
warnDoc.date.splice(toReset - 1, toReset !== 1 ? toReset - 1 : 1)



await warnDoc.save().catch(err => console.log(err))

const removeEmbed = new discord.MessageEmbed()
.setDescription(`${message.client.emoji.success} | Cleared Warn **#${warningID}** from **${mentionedMember.user.tag}** ${logging && logging.moderation.include_reason === "true" ?`\n\n**Reason:** ${reason}`:``}`)
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
if(color == "#000000") color = message.client.color.green;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

const logEmbed = new MessageEmbed()
.setAuthor(`Action: \`Remove Warn\` | ${mentionedMember.user.tag} | Case #${logcase}`, mentionedMember.user.displayAvatarURL({ format: 'png' }))
.addField('User', mentionedMember, true)
.addField('Moderator', message.member, true)
.addField('Reason', reason, true)
.setFooter(`ID: ${mentionedMember.id} | Warn ID: ${warningID}`)
.setTimestamp()
.setColor(color)

channel.send(logEmbed).catch((e)=>{console.log(e)})

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
