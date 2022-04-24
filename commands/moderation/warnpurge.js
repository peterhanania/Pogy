const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Guild = require("../../database/schemas/Guild.js");
const warnModel = require('../../models/moderation.js');
const mongoose = require('mongoose');
const Discord = require("discord.js")
const randoStrings = require("randostrings")
const random = new randoStrings;
const moment = require('moment');
const Logging = require('../../database/schemas/logging.js')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'warnpurge',
        aliases: ['wp'],
        description: 'Warns a member purge their specified messages',
        category: 'Moderation',
        usage: '<user> [reason]',
        examples: ['warnpurge @pogy 10.'],
        guildOnly: true,
      botPermission: ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS', 'MANAGE_MESSAGES'],
      userPermission: ['KICK_MEMBERS', 'MANAGE_MESSAGES'],
      });
    }

    async run(message, args) {
/*------ Guild Data ------*/
const client = message.client
const settings = await Guild.findOne(
  {
    guildId: message.guild.id
  },
  (err, guild) => {
    if (err) console.error(err);
    if (!guild) {
      const newGuild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: message.guild.id,
        guildName: message.guild.name,
        prefix: client.config.prefix,
        language: 'english'
      });

      newGuild
        .save()
        .then(result => console.log(result))
        .catch(err => console.error(err));

      return message.channel
        .send(
          'This server was not in our database! We have added it, please retype this command.'
        )
        .then(m => m.delete({ timeout: 10000 }));
    }
  }
);
  const logging = await Logging.findOne({ guildId: message.guild.id })
const guildDB = await Guild.findOne({
  guildId: message.guild.id
});
let language = require(`../../data/language/${guildDB.language}.json`)

const fail = client.emoji.fail;
const success = client.emoji.success;
    const mentionedMember = message.mentions.members.last() || message.guild.members.cache.get(args[0])
    
  if (!message.member.permissions.has('MANAGE_ROLES')) {
      return message.channel.send({embeds:[new discord.MessageEmbed()
          .setDescription(`${client.emoji.fail} ${language.warnMissingPermission}`)
          .setTimestamp(message.createdAt)
          .setColor(client.color.red)]})
  }
  else if (!mentionedMember) {
      return message.channel.send({embeds:[new discord.MessageEmbed()
          .setDescription(`${client.emoji.fail} | ${language.warnMissingUser}`)
          .setTimestamp(message.createdAt)
          .setColor(client.color.red)]})
  }

  const mentionedPotision = mentionedMember.roles.highest.position
  const memberPotision = message.member.roles.highest.position

  if (memberPotision <= mentionedPotision) {
      return message.channel.send({embeds:[new discord.MessageEmbed()
      .setDescription(client.emoji.fail + " | " + language.warnHigherRole)
          .setTimestamp(message.createdAt)
          .setColor(client.color.red)]})
  }

   const amount = parseInt(args[1]);
    if (isNaN(amount) === true || !amount || amount < 0 || amount > 100)
      return message.channel.send ({ embeds: [new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`${fail} Warn Purge Error`)
      .setDescription(`Please Provide a message count between 1 - 100 messages`)
      .setTimestamp()
      .setFooter({text: 'https://pogy.xyz/'})
      .setColor(message.guild.me.displayHexColor)]});

    let reason = args.slice(2).join(' ');
    if (!reason) reason = 'No Reason Provided';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

let warnID = random.password({
    length: 8,
    string: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  })

  let warnDoc = await warnModel.findOne({
      guildID: message.guild.id,
      memberID: mentionedMember.id,
  }).catch(err => console.log(err))

  if (!warnDoc) {
      warnDoc = new warnModel({
          guildID: message.guild.id,
          memberID: mentionedMember.id,
          modAction: [],
          warnings: [],
          warningID: [],
          moderator: [],
          date: [],
      })

      await warnDoc.save().catch(err => console.log(err));

      warnDoc = await warnModel.findOne({
      guildID: message.guild.id,
      memberID: mentionedMember.id,
  })
  
  }
      warnDoc.modType.push("warn purge")
      warnDoc.warnings.push(reason)
      warnDoc.warningID.push(warnID)
      warnDoc.moderator.push(message.member.id)
      warnDoc.date.push(Date.now())

      await warnDoc.save().catch(err => console.log(err))


    // Purge
    const messages = (await message.channel.messages.fetch({ limit: amount })).filter(m => m.member.id === mentionedMember.id);
    if (messages.size > 0) await message.channel.bulkDelete(messages, true);  

    const embed = new MessageEmbed()
   
      .setDescription(`**${mentionedMember.user.tag}** has been warned, with **${messages.size}** messages purged ${success}${logging && logging.moderation.include_reason === "true" ?`\n\n**Reason:** ${reason}`:``}`)
      .setColor(message.guild.me.displayHexColor)
    message.channel.send({embeds: [embed]})
    .then(async(s)=>{
          if(logging && logging.moderation.delete_reply === "true"){
            setTimeout(()=>{
            s.delete().catch(()=>{})
            }, 5000)
          }
        })
        .catch(()=>{});


      if(logging && logging.moderation.auto_punish.toggle === "true"){
        if(Number(logging.moderation.auto_punish.amount) <= Number(warnDoc.warnings.length)){

          const punishment = logging.moderation.auto_punish.punishment;
          let action;

          if(punishment === "1"){
          action = `banned`;

          await mentionedMember.ban({ reason: `Auto Punish / Responsible user: ${message.author.tag}` }).catch(()=>{})

          } else if (punishment === "2"){
          action = `kicked`;

await mentionedMember.kick({ reason: `Auto Punish / Responsible user: ${message.author.tag}` }).catch(()=>{})


          } else if (punishment === "3"){
          action = `softbanned`;

await mentionedMember.ban({ reason:`Auto Punish / ${language.softbanResponsible}: ${message.author.tag}`, days: 7 });
await message.guild.members.unban(mentionedMember.user, `Auto Punish / ${language.softbanResponsible}: ${message.author.tag}`);

          }

          message.channel.send({embeds:[new discord.MessageEmbed().setColor(message.client.color.green).setDescription(`Auto Punish triggered, ${action} **${mentionedMember.user.tag}** ${message.client.emoji.success}`)]})
          
          const auto = logging.moderation.auto_punish;
          if(auto.dm && auto.dm !== "1"){
            let dmEmbed;
            if(auto.dm === "2"){
            dmEmbed = `${message.client.emoji.fail} You've been ${action} from **${message.guild.name}**\n__(Auto Punish Triggered)__`
            } else if(auto.dm === "3"){
            dmEmbed = `${message.client.emoji.fail} You've been ${action} from **${message.guild.name}**\n__(Auto Punish Triggered)__\n\n**Warn Count:** ${warnDoc.warnings.length}`
            };

            mentionedMember.send ({ embeds: [new MessageEmbed()
            .setColor(message.client.color.red)
            .setDescription(dmEmbed)
            ]})
          }

        }
      }
      
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
.setAuthor(`Action: \`Warn\` | ${mentionedMember.user.tag} | Case #${logcase}`, mentionedMember.user.displayAvatarURL({ format: 'png' }))
.addField('User', mentionedMember, true)
.addField('Moderator', message.member, true)
.addField('Reason', reason, true)
.addField('Message Count', messages.size)
.setFooter({text:`ID: ${mentionedMember.id} | Warn ID: ${warnID}`})
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



function match(msg, i) {
  if (!msg) return undefined;
  if (!i) return undefined;
  let user = i.members.cache.find(
    m =>
      m.user.username.toLowerCase().startsWith(msg) ||
      m.user.username.toLowerCase() === msg ||
      m.user.username.toLowerCase().includes(msg) ||
      m.displayName.toLowerCase().startsWith(msg) ||
      m.displayName.toLowerCase() === msg ||
      m.displayName.toLowerCase().includes(msg)
  );
  if (!user) return undefined;
  return user.user;
}
};
};
