const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/schemas/Guild');
const PROTOCOL_REGEX = /^[a-zA-Z]+:\/\//
const PATH_REGEX = /(\/(.+)?)/g

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'discrim',
        aliases: [ 'discriminator', 'discrims', 'discrim-search', 'discriminator-search' ],
        description: 'Shows a list of members with the same discriminator.',
        category: 'Utility',
        usage: '[discriminator]',
        examples: [ 'discriminator 0001' ],
        guildOnly: true,
        cooldown: 10
      });
    }

    async run(message, args) {

             const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)


      if (!/^\d{4}$/.test(args[0])) {
        return message.channel.send( new MessageEmbed()
.setColor(message.client.color.blue)
.setDescription(`${message.client.emoji.fail} ${language.discrim1}`));
      }

      let members = this.client.users.cache.filter(user => user.discriminator === args[0]).map(user => user.tag);
      let total = members.length;
      members = members.length > 0 ? members.slice(0, 10).join('\n') : `${language.none}`;
    
      await message.channel.send({
        embed: {
          color: 'BLURPLE',
          title: `${language.discrim2}`,
          description: `${language.discrim3} **${total}** ${language.discrim4} **${args[0] || message.author.discriminator}**`,
          fields: [
            {
              name: 'Users',
              value: total > 10 ? `${members} and ${total - 10} more.` : members
            }
          ]
        }
      });
    }
};