const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/schemas/Guild');
const ReactionMenu = require('../../data/ReactionMenu.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'emojis',
        description: `Check the curent guild's emojis`,
        category: 'Information',
        cooldown: 3
      });
    }


    async run(message, args) {

let client = message.client

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      
      let prefix = guildDB.prefix

    const emojis = [];
    message.guild.emojis.cache.forEach(e => emojis.push(`\u0009 ${e} **—** \`:${e.name}:\``));

const embed = new MessageEmbed()
  .setAuthor(`${language.emoji1}`, message.guild.iconURL({ dynamic: true }))
      .setFooter(message.author.tag,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    const interval = 25;
    if (emojis.length === 0) message.channel.send(embed.setDescription(`${language.emoji2}`));
    else if (emojis.length <= interval) {
      const range = (emojis.length == 1) ? '[1]' : `[1 - ${emojis.length}]`;
      message.channel.send(embed
        .setAuthor(`${language.emoji1} ${range}`, message.guild.iconURL({ dynamic: true }))
        .setDescription(emojis.join('\n'))
      );
    
    // Reaction Menu
    } else {

      embed
        .setAuthor(`${language.emoji1}`, message.guild.iconURL({ dynamic: true }))
        .setFooter(message.author.tag,  
          message.author.displayAvatarURL({ dynamic: true })
        );

      new ReactionMenu(message.client, message.channel, message.member, embed, emojis, interval);
    }
  
  }
};