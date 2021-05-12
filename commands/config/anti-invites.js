const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'anti-invites',
        aliases: [ 'anti-invite', 'antiinvite', 'antiinvites' ],
        description: 'Block Invites from the current server!',
        category: 'Config',
        usage: [ '<enable | disable>' ],
        examples: [ 'anti-invites enable', 'anti-invites disable' ],
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
        if(guildDB.antiInvites === true) return message.channel.send( new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.client.emoji.fail} ${language.moduleDisabled}`));

        await Guild.findOne({
          guildId: message.guild.id
      }, async (err, guild) => {
          guild.updateOne({
            antiInvites: false
          })
          .catch(err => console.error(err));
  
          return message.channel.send( new MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setDescription(`${message.client.emoji.success} ${language.antiinvites3}`));
        });
        return;
      }

      if (args.includes('enable')) {

        if(guildDB.antiInvites === true) return message.channel.send( new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.client.emoji.fail} ${language.moduleEnabled}`));

        await Guild.findOne({
          guildId: message.guild.id
      }, async (err, guild) => {
          guild.updateOne({
            antiInvites: true
          })
          .catch(err => console.error(err));
  
          return message.channel.send( new MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setDescription(`${message.client.emoji.success} ${language.antiinvites4}`));
        });
        return;
      }
    }
};