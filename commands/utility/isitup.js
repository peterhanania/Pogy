const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/schemas/Guild');
const PROTOCOL_REGEX = /^[a-zA-Z]+:\/\//
const PATH_REGEX = /(\/(.+)?)/g

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'isitup',
        aliases: [ 'isitonline' ],
        description: 'Checks whether a website is up or down',
        category: 'Utility',
        usage: '<url>',
        cooldown: 3
      });
    }

    async run(message, url) {

             const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      if (url.length < 1) {
        return message.channel.send( new MessageEmbed()
.setColor(message.client.color.blue)
.setDescription(`${message.client.emoji.fail} ${language.isitup2}`));
      }

      url = url.toString().replace(PROTOCOL_REGEX, '').replace(PATH_REGEX, '')
      const embed = new MessageEmbed()

      const body = await fetch(`https://isitup.org/${url}.json`).then(res => res.json())
      if (body.response_code) {
        body.response_time *= 1000
        embed
          .setColor('BLURPLE')
          .setDescription(`${language.isitup0}\n\n**${body.response_ip}**\n**${body.response_time}ms**\n**${body.response_code}**`)
      } else {
embed.setColor(message.client.color.blue)
embed.setDescription(`${message.client.emoji.fail} ${language.isitup3}`)
      }
      message.channel.send(embed)
    }
};