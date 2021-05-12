const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Guild = require("../../database/schemas/Guild.js");
const Economy = require("../../models/economy.js")
const mongoose = require("mongoose")
const Logging = require('../../database/schemas/logging.js')

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'unlock',
        aliases: [ 'unlc' ],
        description: 'unLocks the current / mentioned channel.',
        category: 'Moderation',
        usage: '<channel> [time]',
        examples: [ 'unlock #general' ],
        guildOnly: true,
        botPermission: ['MANAGE_CHANNELS'],
        userPermission: ['MANAGE_CHANNELS'],
      });
    }

    async run(message, args) {
     /*------ Guild Data ------*/
  const client = message.client
  const fail = message.client.emoji.fail
  const success = message.client.emoji.success


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




        let channel = message.mentions.channels.first();
        let reason = args.join(" ") || '`none`'

let member =  message.guild.roles.cache.find(r => r.name.toLowerCase() === 'member');
let memberr =  message.guild.roles.cache.find(r => r.name.toLowerCase() === 'members');
let verified =  message.guild.roles.cache.find(r => r.name.toLowerCase() === 'verified');
 if(channel) {
            reason = args.join(" ").slice(22) || '`none`'
        } else (
            channel = message.channel
        )

        if(channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === true) {
            const lockchannelError2 = new MessageEmbed()
            .setDescription(`${fail} | ${channel} is already unlocked`)
            .setColor(client.color.red)

            return message.channel.send(lockchannelError2)
        }
      
        channel.updateOverwrite(message.guild.me, { SEND_MESSAGES: true }).catch(()=>{})
     
        channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: true }).catch(()=>{})
     
        channel.updateOverwrite(message.author.id, { SEND_MESSAGES: true }).catch(()=>{})

        if(member){
      channel.updateOverwrite(member, { SEND_MESSAGES: true }).catch(()=>{})
        }
        
        if(memberr){
  channel.updateOverwrite(memberr, { SEND_MESSAGES: true }).catch(()=>{})
        }
      
      if(verified){
 channel.updateOverwrite(verified, { SEND_MESSAGES: true }).catch(()=>{})

      }
       

        const embed = new MessageEmbed()
        .setDescription(`${success} | successfully Unlocked **${channel}** ${logging && logging.moderation.include_reason === "true" ?`\n\n**Reason:** ${reason}`:``}`)
        .setColor(client.color.green)
        message.channel.send(embed).then(async(s)=>{
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

if(logging.moderation.lock == "true"){
  
let color = logging.moderation.color;
if(color == "#000000") color = message.client.color.green;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

let reason = args.slice(1).join(' ');
if (!reason) reason = `${language.noReasonProvided}`;
if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

const logEmbed = new MessageEmbed()
.setAuthor(`Action: \`UnLock\` | ${message.author.tag} | Case #${logcase}`, message.author.displayAvatarURL({ format: 'png' }))
.addField('Channel', channel, true)
.addField('Moderator', message.member, true)
.addField('Reason', reason, true)
.setFooter(`ID: ${message.author.id}`)
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
        } catch (err) {

     message.channel.send(`Error, Please try again later`)
    }

};