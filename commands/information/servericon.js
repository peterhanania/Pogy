const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'servericon',
        aliases: ["sicon"],
        description: 'Display\'s the current Server Icon',
        category: 'Information',
        cooldown: 3
      });
    }

    async run(message) {


       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      
       const embed = new MessageEmbed()
      .setAuthor(`${message.guild.name}'s Server Icon`, " ", message.guild.iconURL({ dynamic: true, size: 512 }))
      .setImage(message.guild.iconURL({ dynamic: true, size: 512 }))
      .setFooter(message.author.tag,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);

    }
};