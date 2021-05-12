const Command = require('../../structures/Command');
const { WebhookClient, MessageEmbed } = require('discord.js');
const webhookClient = new WebhookClient('', '');


const logger = require('../../utils/logger');
const Blacklist = require('../../database/schemas/blacklist');
const Guild = require("../../database/schemas/Guild.js");
const mongoose = require("mongoose")
const ms = require("ms")
 const msRegex = RegExp(/(\d+(s|m|h|w))/)
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'blacklist',
        aliases: ['bl'],
        description: 'Adds a user to the blacklist.',
        category: 'Owner',
        usage: [ '<user> <reason>' ],
        ownerOnly: true
      });
    }

    async run(message, args) {
      const match = message.content.match(/\d{18}/);

      let member = match ? message.guild.members.cache.get(args[1]) : null;
      let guild = this.client.guilds.cache.get(args[1]);
      let reason = args.slice(3).join(' ') || 'Not Specified';

      if (args.length < 1) return message.channel.send(`Please provide me with a user or guild blacklist`)
      if (args.length < 2) return message.channel.send(`Provide me with a user`)
      if (args.length < 4) return message.channel.send(`Provide me with a reason`)
      if (args.length < 3) return message.channel.send(`Provide me with a time duration`)

 if (!msRegex.test(args[2])) return message.channel.send(`Provide me with a valid time`)

      if (args[0] === 'user') {
        await Blacklist.findOne({
          discordId: member.id,
        }, (err, user) => {
          if (!user) {
            const blacklist = new Blacklist({ discordId: member.id, length: Date.now() + ms(msRegex.exec(args[2])[1]), type: 'user', isBlacklisted: true, reason })
            blacklist.save()
          } else {
            user.updateOne({ type: 'user', isBlacklisted: true, reason,length: Date.now() + ms(msRegex.exec(args[2])[1]), })
          }
        });

        setTimeout(async () => {
        const isMuted = await Blacklist.findOne({
        discordId: member.id,
    })
    
     await isMuted.deleteOne().catch(err => console.log(err))

       const embedd = new MessageEmbed()
       .setDescription(`${member.user.tag} Got unblacklisted!`)
        webhookClient.send({
          username: 'Pogy',
          avatarURL: `${message.client.domain}/logo.png`,
          embeds: [embedd]
        });
        }, ms(msRegex.exec(args[2])[1]))

        message.channel.send({
          embed: {
            color: "BLURPLE",
            title: `User added to the blacklist! `,
            description: `${member.user.tag} - \`${reason}\`\ntime: ${msRegex.exec(args[2])[1]}`,
          }
        });

        const embed = new MessageEmbed()
          .setColor('BLURPLE')
          .setTitle(`Blacklist Report`)
          .setURL('https://docs.google.com/forms/d/e/1FAIpQLSedBS6JYEqxzXGcs1T9vb7dugZiBxftVrY3CFfk-aP1rFnnrw/viewform?usp=sf_link')
          .addField('Status', 'Added to the blacklist.')
          .addField('User', `${member.user.tag} (${member.id})`)
          .addField('Responsible', `${message.author} (${message.author.id})`)
          .addField('Reason', reason)

        return webhookClient.send({
          username: 'Pogy',
          avatarURL: `${message.client.domain}/logo.png`,
          embeds: [embed]
        });
      }


// guild blacklist
      if (args[0] === 'guild') {
        await Blacklist.findOne({
          guildId: guild,
        }, (err, server) => {
          if (!server) {
            const blacklist = new Blacklist({ guildId: guild.id, length: Date.now() + ms(msRegex.exec(args[2])[1]), type: 'guild', isBlacklisted: true, reason })
            blacklist.save()
          } else {
            server.updateOne({ type: 'guild', isBlacklisted: true, reason, length: Date.now() + ms(msRegex.exec(args[2])[1]), })
          }
        });
        
                setTimeout(async () => {
        const isMuted = await Blacklist.findOne({
        guildId: guild,
    })
    
     await isMuted.deleteOne().catch(err => console.log(err))

       const embedd = new MessageEmbed()
       .setDescription(`Guild ${guild.name} Got unblacklisted!`)
        webhookClient.send({
          username: 'Pogy Blacklists',
          avatarURL: `${message.client.domain}/logo.png`,
          embeds: [embedd]
        });
        }, ms(msRegex.exec(args[2])[1]));

        message.channel.send({
          embed: {
            color: "BLURPLE",
            title: 'Server added to the blacklist!',
            description: `${guild.name} - \`${reason}\``,
          }
        });

        const embed = new MessageEmbed()
          .setColor('BLURPLE')
          .setTitle(`Blacklist Report`)
          .addField('Status', 'Added to the blacklist.')
          .addField('Server', `${guild.name} (${guild.id})`)
          .addField('Responsible', `${message.author} (${message.author.id})`)
          .addField('Reason', reason)

        return webhookClient.send({
          username: 'Pogy Blacklists',
          avatarURL: `${message.client.domain}/logo.png`,
          embeds: [embed]
        });
      }
    }
};
