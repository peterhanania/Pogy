const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const discord = require("discord.js");
const search = require('youtube-search');
const he = require('he');
const config = require('../../config.json');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'youtube',
        description: 'Search Specific videos off youtube!',
        category: 'Fun',
        cooldown: 60
      });
    }

    async run(message, args) {

        const client = message.client
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
          });
        
          const language = require(`../../data/language/${guildDB.language}.json`)

          const apiKey = config.youtube_key;
          const videoName = args.join(' ');
          if (!videoName) return message.channel.send(`${language.youtube}`)
          const searchOptions = { maxResults: 1, key: apiKey, type: 'video' };
          if (!message.channel.nsfw) searchOptions['safeSearch'] = 'strict';
          let result = await search(videoName, searchOptions)
            .catch(() => {});
          result = result.results[0];
          if (!result) 
            return message.channel.send(`${language.youtubeUnable}`).catch(() => {});
          const decodedTitle = he.decode(result.title);
          const embed = new discord.MessageEmbed()
            .setTitle(decodedTitle)
            .setURL(result.link)
            .setDescription(result.description)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('#FF1CA4');
            
          if (message.channel.nsfw) embed.setImage(result.thumbnails.high.url);
          message.channel.send(embed).catch(() => {});

    }
};
