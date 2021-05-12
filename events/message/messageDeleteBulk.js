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
const Maintenance = require('../../database/schemas/maintenance')
module.exports = class extends Event {


  async run(messages) {

const message = messages.first();

const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;

const logging = await Logging.findOne({ guildId: message.guild.id });

if(logging){
  if(logging.message_events.toggle == "true"){


const channelEmbed = await message.guild.channels.cache.get(logging.message_events.channel)

if(channelEmbed){

let color = logging.message_events.color;
if(color == "#000000") color = this.client.color.red;


  if(logging.message_events.deleted == "true"){


     const embed = new MessageEmbed()
    .setAuthor(`Messages Cleared`, message.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setDescription(`**${messages.size} messages** in ${message.channel} were deleted.`)
    .setColor(message.guild.me.displayHexColor)
    .setFooter(`${messages.size} Messages`);

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