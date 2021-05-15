const Event = require('../../structures/Event');
const Discord = require('discord.js');
const config = require('../../config.json');
const webhookClient = new Discord.WebhookClient(config.webhook_id, config.webhook_url);
const fatalCooldown = new Set();
const uuid = require("uuid");
const id = uuid.v4();

module.exports = class extends Event {

  async run(error, message, command) {
    console.log(error);

/*
                  if(message.channel &&
      message.channel.viewable &&
      message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
     if(!fatalCooldown.has(message.channel.id)){
 message.channel.send(`${message.client.emoji.fail} Hey Pogger. An error Just occured and will be reported.\n\`code: ${id}\`\n\nmake sure to report it here (important) https://discord.gg/FqdH4sfKBg `).catch(()=>{});
     
    

     fatalCooldown.add(message.channel.id)
     setTimeout(()=>{
       fatalCooldown.delete(message.channel.id)
     }, 100000)
     }
      }
 */
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`**User:** ${message.author} (${message.author.tag} - ${message.author.id})\n**Message:** ${message.content}\n**Error:** ${error}\n**ID:** \`${id}\`\n\n__**Guild Info**__\nName: ${message.guild.name}\nID: ${message.guild.id}\nChannel: ${message.channel.name} (${message.channel.id})`)
    .setTimestamp()

    webhookClient.send(embed)

  }
};
