const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const discord = require("discord.js")
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'yomama',
        aliases: ['yomoma', 'yommama','yommoma'],
        description: 'Make the bot send a spoiler message!',
        category: 'Fun',
        cooldown: 3
      });
    }

    async run(message, args) {
        const client = message.client
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || match(args.join(" ").toLowerCase(), message.guild) || message.author;
    
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
          });
        
          const language = require(`../../data/language/${guildDB.language}.json`)

          
          const res = await fetch('https://api.yomomma.info');
          let joke = (await res.json()).joke;
          joke = joke.charAt(0).toLowerCase() + joke.slice(1);
          if (!joke.endsWith('!') && !joke.endsWith('.') && !joke.endsWith('"')) joke += '!';
            message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(`hey ${user}, ${joke}`)).catch(() => {});
  
    }
};

function match(msg, i) {
    if (!msg) return undefined;
    if (!i) return undefined;
    let user = i.members.cache.find(
      m =>
        m.user.username.toLowerCase().startsWith(msg) ||
        m.user.username.toLowerCase() === msg ||
        m.user.username.toLowerCase().includes(msg) ||
        m.displayName.toLowerCase().startsWith(msg) ||
        m.displayName.toLowerCase() === msg ||
        m.displayName.toLowerCase().includes(msg)
    );
    if (!user) return undefined;
    return user.user;
  }