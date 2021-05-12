const Event = require('../../structures/Event');
const discord = require("discord.js");
const config = require('./../../config.json');
const { MessageEmbed } = require('discord.js');
const logger = require('../../utils/logger');
const mongoose = require('mongoose');
const Guild = require('../../database/schemas/Guild');
const User = require('../../database/schemas/User');
const metrics = require('datadog-metrics');
require("moment-duration-format");
const Db = require("../../packages/reactionrole/models/schema.js");
const reactionTicket = require("../../models/tickets.js");
const Logging = require('../../database/schemas/logging');
const Snipe = require('../../database/schemas/snipe');
const Maintenance = require('../../database/schemas/maintenance')
module.exports = class extends Event {


  async run(message) {

if (!message.guild) return;

const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;


let snipe = await Snipe.findOne({ guildId: message.guild.id, channel: message.channel.id})


const logging = await Logging.findOne({ guildId: message.guild.id });
 if(message && message.author && !message.author.bot){
if(!snipe){ 

      const snipeSave = new Snipe({
              guildId: message.guild.id,
              channel: message.channel.id
            })

          snipeSave.message.push(message.content || null)
          snipeSave.tag.push(message.author.id)
          snipeSave.image.push(message.attachments.first() ? message.attachments.first().proxyURL : null)

          snipeSave.save().catch(()=>{})
      
          snipe = await Snipe.findOne({ guildId: message.guild.id, channel: message.channel.id})
            

} else {

  if(snipe.message.length > 4){
  
  snipe.message.splice(-5,1);
  snipe.tag.splice(-5,1);
  snipe.image.splice(-5,1);

  snipe.message.push(message.content || null)
  snipe.tag.push(message.author.id)
  snipe.image.push(message.attachments.first() ? message.attachments.first().proxyURL : null)

  } else {

    snipe.message.push(message.content || null)
  snipe.tag.push(message.author.id)
  snipe.image.push(message.attachments.first() ? message.attachments.first().proxyURL : null)

  }

  snipe.save().catch(()=>{})

} 
 }
 if (message.webhookID || (!message.content && message.embeds.length === 0)) return;

let reactionDatabase = await Db.findOne({

        guildid: message.guild.id,
        msgid: message.id,
        
  })

let ticketDatabase = await reactionTicket.findOne({
  guildID: message.guild.id,
  messageID: message.id
})



if(reactionDatabase){
  
const conditional = {
        guildid: message.guild.id,
        msgid: message.id,
}
const results = await Db.find(conditional)

if (results && results.length) {
    for (const result of results) {
        const { guildid } = result

        try {
            await Db.deleteOne(conditional)
        } catch (e) {
            console.log(e)
        }

    }

}

}

if(ticketDatabase){
  
await ticketDatabase.deleteOne().catch(()=>{})

}

if(logging){
  if(logging.message_events.toggle == "true"){

if(logging.message_events.ignore == "true"){
  if(message.author.bot) return;
}

const channelEmbed = await message.guild.channels.cache.get(logging.message_events.channel)

if(channelEmbed){

let color = logging.message_events.color;
if(color == "#000000") color = message.client.color.red;


  if(logging.message_events.deleted == "true"){


     const embed = new MessageEmbed()
    .setAuthor(`${message.author.tag} | Message Deleted`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(`ID: ${message.id}`)
    .setColor(message.guild.me.displayHexColor);


if (message.content) {

 

      if (message.content.length > 1024) message.content = message.content.slice(0, 1021) + '...';

      embed
      .setDescription(`${message.member}'s message got deleted in ${message.channel}`)
        .addField('Message', message.content);
        
    


  } else { 

      embed
        .setDescription(`${message.member} deleted an **embed** in ${message.channel}`);

    
  }

    if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send(embed).catch(()=>{})
      }
  }


  }
 }
}





}
}