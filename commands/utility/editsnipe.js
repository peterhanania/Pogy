const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')
const Snipe = require('../../database/schemas/editsnipe')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'editsnipe',
        description: 'Snipe Edited Messages in the channel',
        category: 'Utility',
        usage: [ 'editsnipe' ],
        cooldown: 10,
      });
    }

    async run(message, args) {

      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
      

      const language = require(`../../data/language/${guildDB.language}.json`);
      
let prefix = guildDB.prefix;
let fail = message.client.emoji.fail;
let client = message.client

let channel = message.mentions.channels.first();
if(!channel) channel = message.channel

const snipe = await Snipe.findOne({ guildId: message.guild.id, channel: channel.id})

const no = new MessageEmbed()
.setAuthor(`#${channel.name} | ${message.guild.name}`, message.guild.iconURL())
        .setFooter(message.guild.name)
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.client.emoji.fail} | Couldn't find any edited message in **${channel.name}**`)

if(!snipe){
  return message.channel.send(no)
}

if(snipe.oldmessage.length < 1){
  return message.channel.send(no)
}
if(snipe.newmessage.length < 1){
  return message.channel.send(no)
}

const data = []

      const embed = new MessageEmbed()
        .setAuthor(`#${channel.name} | ${message.guild.name}`, message.guild.iconURL())
        .setFooter(message.guild.name)
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor)

for (let i = 0; snipe.oldmessage.length  > i; i++) {
            data.push(`**${i + 1}**`)

            embed.addField(`Message #${i + 1}`, `**User:** ${await message.client.users.fetch(snipe.id[i]) || 'Unknown'}\n**Message:** ${snipe.oldmessage[i] || 'None'} ➜ ${snipe.newmessage[i]}\n[Jump To Message](${snipe.url[i]})\n`)

        };
        
        if(data.length < 1) return message.channel.send(no);

        

        message.channel.send(embed).catch(async(err)=>{
          await snipe.deleteOne().catch(()=>{})
          message.channel.send(`The embed contained a huge field that couldn't fit as this is the reason i failed to send the embed. I have resetted the database as you can try rerunning the command again.`)
        })
    }
};
