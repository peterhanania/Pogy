const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const send = require(`../../packages/logs/index.js`)
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'say',
        description: 'Make the bot send a message!',
        category: 'Fun',
        cooldown: 3
      });
    }

    async run(message, args) {

        const client = message.client
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
          });
        
          const language = require(`../../data/language/${guildDB.language}.json`)


 
 let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
 if (channel) {
   args.shift();
 } else channel = message.channel;

  // Check type and viewable
 if (channel.type != 'text' || !channel.viewable) return message.channel.send(`${language.notaccessible}`)


 if (!args[0]) return message.channel.send(`${language.whatdoIsay}`);

 // Check channel permissions
 if (!channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES']))
   return message.channel.send(`${language.sendmessages}`)

 if (!channel.permissionsFor(message.member).has(['SEND_MESSAGES']))
   return message.channel.send(`${language.userSendMessages}`);

 const msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);
 send(channel, msg, {
   name: `${message.author.username}`,
   icon: `${message.author.displayAvatarURL()}`
 }).catch(()=>{})

    }
};