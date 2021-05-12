const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Pogy');
const Guildd = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const moment = require("moment")
moment.suppressDeprecationWarnings = true;

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'news',
        description: `Shows Pogy's latest news`,
        category: 'Information',
        cooldown: 3
      });
    }

    async run(message) {
           const client = message.client;
      const guildDB = await Guild.findOne({
        tag: '710465231779790849'
      });
      
 
      const guildDB2 = await Guildd.findOne({
        guildId: message.guild.id
      });

      const language = require(`../../data/language/${guildDB2.language}.json`)

      if(!guildDB) return message.channel.send(`${language.noNews}`)


        
        let embed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle(`Pogy News`)
      .setDescription(`***__${language.datePublished}__ ${moment(guildDB.time).format("dddd, MMMM Do YYYY")}*** *__[\`(${moment(guildDB.time).fromNow()})\`](https://pogy.xyz)__*\n\n ${guildDB.news}`)
      .setFooter('https://pogy.xyz')
      .setTimestamp();

      message.channel.send(embed).catch(() => {
        message.channel.send(`${language.noNews}`)
      });
    
    }
};