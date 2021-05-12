const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');
const discord = require("discord.js");
const moment = require('moment');
const Maintenance = require('../../database/schemas/maintenance')
module.exports = class extends Event {

async run(role) {
if(!role) return;
if(role.managed) return;
const logging = await Logging.findOne({ guildId: role.guild.id })

const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;


if(logging){
  if(logging.server_events.toggle == "true"){



const channelEmbed = await role.guild.channels.cache.get(logging.server_events.channel)

if(channelEmbed){

let color = logging.server_events.color;
if(color == "#000000") color = role.client.color.red


  if(logging.server_events.role_create == "true"){

 const embed = new discord.MessageEmbed()
    .setDescription(`🗑️ ***Role Deleted***`)
    .addField('Role Name', role.name, true)
    .setFooter(`Role ID: ${role.id}`)
    .setTimestamp()
    .setColor(color)

    if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(role.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send(embed).catch(()=>{})
      }


  }


  }
 }
}


  }
};