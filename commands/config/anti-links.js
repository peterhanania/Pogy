const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'anti-links',
        aliases: [ 'anti-link', 'antilink', 'antilink' ],
        description: 'Sets anti-invite if the message contains a link',
        category: 'Config',
        usage: [ '<enable | disable>' ],
        examples: [ 'anti-links enable', 'anti-links disable' ],
        cooldown: 3,
        userPermission: ['MANAGE_GUILD'],
      });
    }

    async run(message, args) {

      const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });


      const language = require(`../../data/language/${guildDB.language}.json`)
      


      if (args.length < 1) {
        return message.channel.send( new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.client.emoji.fail} ${language.antiinvites1}`));
      }

      if (!message.content.includes('enable') && !message.content.includes('disable')) {
        return message.channel.send( new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.client.emoji.fail} ${language.antiinvites1}`));
      }

      if (args.includes('disable')) {

        if(guildDB.antiLinks === false) return message.channel.send( new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.client.emoji.fail} ${language.moduleDisabled}`));

        await Guild.findOne({
          guildId: message.guild.id
      }, async (err, guild) => {
          guild.updateOne({
            antiLinks: false
          })
          .catch(err => console.error(err));
  
          return message.channel.send( new MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setDescription(`${message.client.emoji.success} ${language.antilinks3}`));
        });
        return;
      }

      if (args.includes('enable')) {
        if(guildDB.antiLinks === true) return message.channel.send( new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.client.emoji.fail} ${language.moduleEnabled}`));
        
        await Guild.findOne({
          guildId: message.guild.id
      }, async (err, guild) => {
          guild.updateOne({
            antiLinks: true
          })
          .catch(err => console.error(err));
  
          return message.channel.send( new MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setDescription(`${message.client.emoji.success} ${language.antilinks4}`));
        });
        return;
      }
    }
};