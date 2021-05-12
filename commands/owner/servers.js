const Command = require('../../structures/Command');
const ReactionMenu = require('../../data/ReactionMenu.js');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'servers',
        aliases: [],
        description: 'Check the servers!',
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message) {
     
    const servers = message.client.guilds.cache.array().map(guild => {
      return `\`${guild.id}\` - **${guild.name}** - \`${guild.memberCount}\` members`;
    });

    const embed = new MessageEmbed()
      .setTitle('Server List')
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    if (servers.length <= 10) {
      const range = (servers.length == 1) ? '[1]' : `[1 - ${servers.length}]`;
      message.channel.send(embed.setTitle(`Server List ${range}`).setDescription(servers.join('\n')));
    } else {
      new ReactionMenu(message.client, message.channel, message.member, embed, servers);
    }

    }
};
