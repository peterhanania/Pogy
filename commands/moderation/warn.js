const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Guild = require("../../database/schemas/Guild.js");
const warnModel = require('../../models/moderation.js');
const mongoose = require('mongoose');
const Discord = require("discord.js")
const randoStrings = require("randostrings")
const random = new randoStrings
const Logging = require('../../database/schemas/logging.js')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'warn',
        aliases: ['w'],
        description: 'Gives a warning to the specified user from your Discord server.',
        category: 'Moderation',
        usage: '<user> [reason]',
        examples: [ 'warn @Peter Please do not swear.' ],
        guildOnly: true,
        userPermission: ['KICK_MEMBERS'],
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

    const mentionedMember = message.mentions.members.last() || message.guild.members.cache.get(args[0])
    
 if (!mentionedMember) {
      return message.channel.send(new Discord.MessageEmbed()
          .setDescription(`${client.emoji.fail} | ${language.warnMissingUser}`)
          .setTimestamp(message.createdAt)
          .setColor(client.color.red))
  }

  const mentionedPotision = mentionedMember.roles.highest.position
  const memberPotision = message.member.roles.highest.position

  if (memberPotision <= mentionedPotision) {
      return message.channel.send(new Discord.MessageEmbed()
      .setDescription(client.emoji.fail + " | " + language.warnHigherRole)
          .setTimestamp(message.createdAt)
          .setColor(client.color.red))
  }

  const reason = args.slice(1).join(' ') || 'Not Specified'
  
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
      warnDoc.modType.push("warn")
      warnDoc.warnings.push(reason)
      warnDoc.warningID.push(warnID)
      warnDoc.moderator.push(message.member.id)
      warnDoc.date.push(Date.now())

      await warnDoc.save().catch(err => console.log(err))
      let dmEmbed;
if(logging && logging.moderation.warn_action && logging.moderation.warn_action !== "1"){

  if(logging.moderation.warn_action === "2"){
dmEmbed = `${message.client.emoji.fail} You've been warned in **${message.guild.name}**`
  } else if(logging.moderation.warn_action === "3"){
dmEmbed = `${message.client.emoji.fail} You've been warned in **${message.guild.name}**\n\n__**Reason:**__ ${reason}`
  } else if(logging.moderation.warn_action === "4"){
dmEmbed = `${message.client.emoji.fail} You've been warned in **${message.guild.name}**\n\n__**Moderator:**__ ${message.author} **(${message.author.tag})**\n__**Reason:**__ ${reason}`
  }

mentionedMember.send(new MessageEmbed().setColor(message.client.color.red)
.setDescription(dmEmbed)
).catch(()=>{})
}
      message.channel.send(new Discord.MessageEmbed().setColor(client.color.green).setDescription(`${language.warnSuccessful
      
      .replace("{emoji}", client.emoji.success)
      .replace("{user}", `**${mentionedMember.user.tag}** `)}
      ${logging && logging.moderation.include_reason === "true" ?`\n\n**Reason:** ${reason}`:``}`)).then(async(s)=>{
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

          message.channel.send(new Discord.MessageEmbed().setColor(message.client.color.green).setDescription(`Auto Punish triggered, ${action} **${mentionedMember.user.tag}** ${message.client.emoji.success}`))
          
          const auto = logging.moderation.auto_punish;
          if(auto.dm && auto.dm !== "1"){
            let dmEmbed;
            if(auto.dm === "2"){
            dmEmbed = `${message.client.emoji.fail} You've been ${action} from **${message.guild.name}**\n__(Auto Punish Triggered)__`
            } else if(auto.dm === "3"){
            dmEmbed = `${message.client.emoji.fail} You've been ${action} from **${message.guild.name}**\n__(Auto Punish Triggered)__\n\n**Warn Count:** ${warnDoc.warnings.length}`
            };

            mentionedMember.send(new MessageEmbed()
            .setColor(message.client.color.red)
            .setDescription(dmEmbed)
            )
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
if(color == "#000000") color = message.client.color.red;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

const logEmbed = new MessageEmbed()
.setAuthor(`Action: \`Warn\` | ${mentionedMember.user.tag} | Case #${logcase}`, mentionedMember.user.displayAvatarURL({ format: 'png' }))
.addField('User', mentionedMember, true)
.addField('Moderator', message.member, true)
.addField('Reason', reason, true)
.setFooter(`ID: ${mentionedMember.id} | Warn ID: ${warnID}`)
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
