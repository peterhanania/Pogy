const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'settings',
        aliases: [ 'cfg'],
        description: 'Show\'s the current settings for this guild',
        category: 'Config',
        guildOnly: true,
        userPermission: ['MANAGE_GUILD'],
      });
    }

    async run(message, args) {
      const settings = await Guild.findOne({
        guildId: message.guild.id,
      });
      const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });


      const language = require(`../../data/language/${guildDB.language}.json`)
      await message.channel.send ({ embeds: [new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle(`${language.serversettings1}`)
      .addField(`Main Settings`, `[\`Click here\`](https://pogy.xyz/dashboard/${message.guild.id})`, true)
      .addField(`Welcome & Leave`, `[\`Click here\`](https://pogy.xyz/dashboard/${message.guild.id}/welcome)`, true)
      .addField(`Logging`, `[\`Click here\`](https://pogy.xyz/dashboard/${message.guild.id}/logging)`, true)
      .addField(`Autorole`, `[\`Click here\`](https://pogy.xyz/dashboard/${message.guild.id}/autorole)`, true)
      .addField(`Alt Detector`, `[\`Click here\`](https://pogy.xyz/dashboard/${message.guild.id}/altdetector)`, true)
      .addField(`Tickets`, `[\`Click here\`](https://pogy.xyz/dashboard/${message.guild.id}/tickets)`, true)
      .addField(`Suggestions`, `[\`Click here\`](https://pogy.xyz/dashboard/${message.guild.id}/Suggestions)`, true)
      .addField(`Server Reports`, `[\`Click here\`](https://pogy.xyz/dashboard/${message.guild.id}/reports)`, true)
      .addField(`Automod`, `[\`Click here\`](https://pogy.xyz/dashboard/${message.guild.id}/automod)`, true)

      .setFooter({ text: `${message.guild.name}`})

      
      ]})
      
    }
};