const Command = require('../../structures/Command');
const rgx = /^(?:<@!?)?(\d+)>?$/;
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'leaveguild',
        aliases: ['lg'],
        description: 'Leave a guild!',
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message, args) {
      
      const guildId = args[0];
    if (!rgx.test(guildId))
      return message.channel.send(`Provide a guild`)
    const guild = message.client.guilds.cache.get(guildId);
    if (!guild) return message.channel.send(`Invalid guild ID`)
    await guild.leave();
    const embed = new MessageEmbed()
      .setTitle('Leave Guild')
      .setDescription(`I have successfully left **${guild.name}**.`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);

    }
};
