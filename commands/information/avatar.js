const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

const Guild = require('../../database/schemas/Guild');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'avatar',
        aliases: ['profilepic', 'pic', 'ava', 'av'],
        usage: '[user]',
        description: 'Displays a user\'s avatar',
        category: 'Information',
        examples: [ 'av', 'av @Peter'],
        cooldown: 3
      });
    }

    async run(message) {

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)

      
      const match = message.content.match(/\d{18}/);
      let member = match ? message.guild.members.cache.get(match[0]) : message.member

      if (!member) member = message.member

 const embed = new MessageEmbed()
    .setAuthor(`${language.pfpAvatar.replace("{user}", `${member.user.tag}`)}`, member.user.displayAvatarURL({ dynamic: true, size: 512 }), member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(member.displayHexColor);
       return message.channel.send(embed);
    }
};