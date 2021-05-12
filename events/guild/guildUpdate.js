const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');
const discord = require("discord.js");
const moment = require('moment');
const Maintenance = require('../../database/schemas/maintenance')
module.exports = class extends Event {

async run(oldGuild, newGuild) {

     
const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;
 
const logging = await Logging.findOne({ guildId: oldGuild.id })


if(logging){
  if(logging.server_events.toggle == "true"){


const channelEmbed = await oldGuild.channels.cache.get(logging.server_events.channel)

if(channelEmbed){

let color = logging.server_events.color;
if(color == "#000000") color = oldGuild.client.color.yellow;


  if(logging.server_events.channel_created == "true"){


    const embed = new discord.MessageEmbed()
    .setDescription(`:pencil: ***Guild Updated***`)
    .setFooter(`Guild ID: ${oldGuild.id}`)
    .setTimestamp()
    .setColor(color)


if(oldGuild.name !== newGuild.name) {
    embed.addField('Name Update', `${oldGuild.name} --> ${newGuild.name}`, true)

 } else {
    embed.addField('Name Update', `Name not updated`, true)

 }


if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
    embed.addField('verification Level', `${oldGuild.verificationLevel || 'none'} --> ${newGuild.verificationLevel || 'none'}`, true)

 }

 if(oldGuild.icon !== newGuild.icon) {
    embed.addField('Icon', `[old Icon](${oldGuild.iconURL({ dynamic: true, size: 512 })}) --> [new Icon](${newGuild.iconURL({ dynamic: true, size: 512 })})`, true)

 }

 
 if(oldGuild.region !== newGuild.region) {
    embed.addField('region', `${oldGuild.region || 'none'} --> ${newGuild.region || 'none'}`, true)

 }


   if(oldGuild.ownerID !== newGuild.ownerID) {
    embed.addField('Owner', `<@${oldGuild.ownerID || 'none'}> **(${oldGuild.ownerID})** --> <@${newGuild.ownerID}>**(${newGuild.ownerID})**`, true)

 }

   if(oldGuild.afkTimeout !== newGuild.afkTimeout) {
    embed.addField('afk Timeout', `${oldGuild.afkTimeout || 'none'} --> ${newGuild.afkTimeout || 'none'}`, true)

 }

   if(oldGuild.afkChannelID !== newGuild.afkChannelID) {
    embed.addField('afk Channel', `${oldGuild.afkChannelID || 'none'}> --> ${newGuild.afkChannelID || 'none'}`, true)

 }


    
    if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(newGuild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send(embed).catch(()=>{})
      }


  

  }
  }
 }

}



  }
};