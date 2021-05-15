const Command = require('../../structures/Command');
const { WebhookClient, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const webhookClient = new WebhookClient(config.webhook_id, config.webhook_url);
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

      let member = match ? message.guild.members.cache.get(args[1]) : null;
      let guild = this.client.guilds.cache.get(args[1]);
      let reason = args.slice(2).join(' ') || 'Not Specified';

      if (args.length < 1) return message.channel.send('<:sbdeny:736927045522817106> You have to give me the blacklist type: `user` or `guild`')
      if (args.length < 2) return message.channel.send('<:sbdeny:736927045522817106> You have to give me a user to blacklist!')
      if (args.length < 3) return message.channel.send('<:sbdeny:736927045522817106> You have to give me a reason for blacklist!')

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
          .setURL('https://docs.google.com/forms/d/e/1FAIpQLSedBS6JYEqxzXGcs1T9vb7dugZiBxftVrY3CFfk-aP1rFnnrw/viewform?usp=sf_link')
          .addField('Status', 'Removed from the blacklist.')
          .addField('User', `${member.user.tag} (${member.id})`)
          .addField('Responsible', `${message.author} (${message.author.id})`)
          .addField('Reason', reason)

        webhookClient.send({
          username: 'Pogy',
          avatarURL: 'https://cdn.slaybot.xyz/assets/logos/slaybotlogo.png',
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
          .setURL('https://docs.google.com/forms/d/e/1FAIpQLSedBS6JYEqxzXGcs1T9vb7dugZiBxftVrY3CFfk-aP1rFnnrw/viewform?usp=sf_link')
          .addField('Status', 'Removed from the blacklist.')
          .addField('Server', `${guild.name} (${guild.id})`)
          .addField('Responsible', `${message.author} (${message.author.id})`)
          .addField('Reason', reason)

        webhookClient.send({
          username: 'SlayBot',
          avatarURL: 'https://cdn.slaybot.xyz/assets/logos/slaybotlogo.png',
          embeds: [embed]
        });
      }
/*
      const embed = new MessageEmbed()
        .setTitle(`Blacklist Report`)
        .setURL('https://docs.google.com/forms/d/e/1FAIpQLSedBS6JYEqxzXGcs1T9vb7dugZiBxftVrY3CFfk-aP1rFnnrw/viewform?usp=sf_link')
        .addField('Status', 'Removed from the blacklist.')
        .addField('User', `${member} (${member.id})`)
        .addField('Responsible', `${message.author} (${message.author.id})`)
        .addField('Reason', reason || 'Not Specified')

      webhookClient.send({
        username: 'SlayBot',
        avatarURL: 'https://cdn.slaybot.xyz/assets/logos/slaybotlogo.png',
        embeds: [embed]
      });*/
    }
};
