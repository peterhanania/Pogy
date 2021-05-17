const Command = require('../../structures/Command');
const { WebhookClient, MessageEmbed } = require('discord.js');
const webhookClient = new WebhookClient('807251494520881232', 'JpQapDJHsWHJJasugEk3ZpWaTPhxqP9c_sYcyABjSrkxpCIvBwJzt_0G6xL1GB0wS3iy');
const logger = require('../../utils/logger');
const Blacklist = require('../../database/schemas/blacklist');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'unblacklist',
        description: 'Removes a user from the blacklist.',
        category: 'Owner',
        usage: [ '<user>' ],
        ownerOnly: true
      });
    }

    async run(message, args) {
       const match = message.content.match(/\d{18}/);
      let member;
      try {
member =  match ? message.mentions.members.first() || message.guild.members.fetch(args[1]) : null;
      } catch {
        return message.channel.send(`Provide me with a user`)
      }
   
      let guild = this.client.guilds.cache.get(args[1]);
      let reason = args.slice(2).join(' ') || 'Not Specified';

      if (args.length < 1) return message.channel.send(`Please provide me with a user or guild blacklist`)
      if (args.length < 2) return message.channel.send(`Provide me with a user`)
   
   


      if(!member) return message.channel.send(`Provide me with a valid user`)
      //.then(logger.info(`I have added ${member.user.tag} to the blacklist!`, { label: 'Blacklist' }))

      if (args[0].includes('user')) {
        await Blacklist.findOne({
          discordId: member.id,
        }, (err, user) => {
          user.deleteOne()
        })
        message.channel.send({
          embed: {
            color: "BLURPLE",
            title: 'User removed from the blacklist!',
            description: `${member.user.tag} - \`${reason}\``,
          }
        });

        const embed = new MessageEmbed()
          .setColor('BLURPLE')
          .setTitle(`Blacklist Report`)
          .addField('Status', 'Removed from the blacklist.')
          .addField('User', `${member.user.tag} (${member.id})`)
          .addField('Responsible', `${message.author} (${message.author.id})`)
          .addField('Reason', reason)

        webhookClient.send({
          username: 'Pogy',
          avatarURL: 'https://pogy.xyz/logo.png',
          embeds: [embed]
        });

        return;
      }

      if (args[0].includes('guild')) {
        await Blacklist.findOne({
          guildId: guild.id,
        }, (err, server) => {
          server.deleteOne()
        })
        
        message.channel.send({
          embed: {
            color: "BLURPLE",
            title: 'Server removed from the blacklist!',
            description: `${guild.name} - \`${reason}\``,
          }
        });

        const embed = new MessageEmbed()
          .setColor('BLURPLE')
          .setTitle(`Blacklist Report`)
          .addField('Status', 'Removed from the blacklist.')
          .addField('Server', `${guild.name} (${guild.id})`)
          .addField('Responsible', `${message.author} (${message.author.id})`)
          .addField('Reason', reason)

        webhookClient.send({
          username: 'Pogy',
          avatarURL: 'https://pogy.xyz/logo.png',
          embeds: [embed]
        });
      }

    }
};
