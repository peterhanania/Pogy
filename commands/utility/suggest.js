const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/schemas/Guild');
const send = require(`../../packages/logs/index.js`)
const discord = require('discord.js');
const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms');
const mss = require("parse-ms")
let reminderstarted = new Set();
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'suggest',
        description: 'Suggest Something if the module is enabled!',
        category: 'Utility',
        cooldown: 20,
        botPermission: ["ADD_REACTIONS", "USE_EXTERNAL_EMOJIS"]
      });
    }

    async run(message, args) {


      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
      

      const language = require(`../../data/language/${guildDB.language}.json`);
      
let prefix = guildDB.prefix
let fail = message.client.emoji.fail

let suggestColor = guildDB.suggestion.suggestioncolor
if(suggestColor == '#000000') suggestColor = message.guild.me.displayHexColor


if(!guildDB.suggestion.suggestionChannelID || !guildDB.suggestion.suggestionChannelID === null) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.suggesting1}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));

let suggestion = guildDB.suggestion.suggestionChannelID
let channel = message.guild.channels.cache.get(suggestion)
if(!channel) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.suggesting2}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));
  
let suggestionName = args.slice(0).join(" ")
if(!suggestionName) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.suggest1}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));

if(args.join(' ').length > 600) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.suggesting17}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));

let log = new discord.MessageEmbed()
  .setColor(suggestColor)
  .setTitle(`Guild Suggestions`)
  .setDescription(`**A new User just Suggested!**`)
  .addField(`${language.report18}`, message.member, true)
  .addField(`${language.report19}`, message.member.id, true)
  .addField(`${language.report20}`, message.author.tag, true)
  .addField(`Channel`, message.channel, true)
  .addField(`${language.report25}`, `${moment(new Date()).format("dddd, MMMM Do YYYY")}`, true)
  .addField(`Suggestion`, `\`\`\`${suggestionName}\`\`\``)
  .setFooter(message.author.tag,  message.author.displayAvatarURL({ dynamic: true }))


if(guildDB.suggestion.suggestionChannelID !== null){
  let channelLog = await message.guild.channels.cache.get(guildDB.suggestion.suggestionlogChannelID)
  if(channelLog){
     send(channelLog, log, {
   name: `Suggestion Logs`,
   icon: `${message.client.domain}/logo.png`
 }).catch(()=>{})
  }
}



let embed = new discord.MessageEmbed()
  .setColor('PURPLE')
  .setTitle(`${language.suggesting3}`)
  .setDescription(suggestionName)
  .setFooter(`${language.suggesting4} ${message.author.tag}`)



  if(guildDB.isPremium == "false"){
  channel.send(embed).catch(err => {return message.channel.send(`${language.suggesting5}`)})
  .then(async(sug) => {
   
  sug.react("788438144818217000").catch(() => {})  
  await delay(750);
  sug.react("811561362878496838").catch(() => {})
  await delay(750); 
  sug.react("790491137289879583").catch(() => {})
  
  })
  } else if(guildDB.isPremium == "true"){
   let member = message.member
   const description = guildDB.suggestion.description || `{suggestion}`;
   const footer = guildDB.suggestion.footer || `suggested by {user_tag}`
   let theEmbed = new discord.MessageEmbed()
   .setColor(suggestColor)
   .setTitle(`${language.suggesting3}`)
   .setDescription(`${description.replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_ID}/g, `${member.id}`)
        .replace(/{guild_name}/g, `${member.guild.name}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        .replace(/{suggestion}/g, `${suggestionName}`)}`)
    .setFooter(`${footer.replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_ID}/g, `${member.id}`)
        .replace(/{guild_name}/g, `${member.guild.name}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        .replace(/{guild_ID}/g, `${member.guild.id}`)}`)

    if(guildDB.suggestion.timestamp == "true") theEmbed.setTimestamp()

    channel.send(theEmbed).catch(err => {return message.channel.send(`I could not send the suggestion Properly since my embed description either exceeds 2000 characters, or I do not have permissions to talk in the Suggestion Channel. Kindly report that to a staff member.`)})
  .then(async(sug) => {
    if(guildDB.suggestion.reaction == "1"){

   sug.react("788438144818217000").catch(() => {})  
   await delay(750);
   sug.react("811561362878496838").catch(() => {})  
   await delay(750);
   sug.react("790491137289879583").catch(() => {})
  

    } else if(guildDB.suggestion.reaction == "2"){

    sug.react("👍").catch(() => {})
    await delay(750);
    sug.react("👎").catch(() => {})
  

    } else if(guildDB.suggestion.reaction == "3"){

    sug.react("✅").catch(() => {})
    await delay(750);
    sug.react("❌").catch(() => {})  
    


    } else {
    
   sug.react("788438144818217000").catch(() => {})  
   await delay(750);
   sug.react("811561362878496838").catch(() => {})  
   await delay(750);
   sug.react("790491137289879583").catch(() => {}) 
   
    }


  })

  }





  message.channel.send(new MessageEmbed()
  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' }))
  .setDescription(`${language.suggesting6} ${channel}`)
  .setFooter('https://pogy.xyz')
  .setTimestamp()
  .setColor('GREEN')).then(k => {

if(guildDB.deleteSuggestion == "true"){
        message.delete().catch(() => {})
}



       setTimeout(() => {
        k.delete().catch(() => {}) 
      }, 10000);
  })

    }
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}