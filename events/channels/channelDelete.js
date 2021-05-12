const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');
const discord = require("discord.js");
const moment = require('moment');
const cooldown = new Set();

const Maintenance = require('../../database/schemas/maintenance')
module.exports = class extends Event {

async run(message, channel) {

const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;

const logging = await Logging.findOne({ guildId: message.guild.id })

if(cooldown.has(message.guild.id)) return;


if(logging){
  if(logging.server_events.toggle == "true"){


if (message.name.indexOf('Room') >= 0) return;

const channelEmbed = await message.guild.channels.cache.get(logging.server_events.channel)

if(channelEmbed){

let color = logging.server_events.color;
if(color == "#000000") color = message.client.color.red;


  if(logging.server_events.channel_delete == "true"){


    const embed = new discord.MessageEmbed()
    .setDescription(`:wastebasket: ***Channel Deleted***`)
    .addField('Channel Type', message.type, true)
    .addField('Channel Name', message.name, true)
    .setFooter(`Channel ID: ${message.id}`)
    .setTimestamp()
    .setColor(color)

    if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send(embed).catch(()=>{})
                   cooldown.add(message.guild.id);
            setTimeout(()=>{
cooldown.delete(message.guild.id)
            }, 3000)
      }
  }


  }
 }
}


  }
};