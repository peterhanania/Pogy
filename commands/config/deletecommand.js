const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const customCommand = require('../../database/schemas/customCommand.js');
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'deletecommand',
        description: 'Deletes a custom command',
        category: 'Config',
        userPermission: 'MANAGE_MESSAGES',
        aliases: [ 'delcommand', 'removecommand'],
        usage: [ '<command>' ],
        examples: [ 'deletecommand Pog' ],
        cooldown: 3,
        userPermission: ['MANAGE_GUILD'],
      });
    }

    async run(message, args) {

      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      let prefix = guildDB.prefix;
    
      const language = require(`../../data/language/${guildDB.language}.json`)

      
      const name = args[0].toLowerCase();

      if (!name) return message.channel.send ({ embeds: [new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${language.properusage} \`${prefix}deletecommand <command-name>\`\n\n${language.example} \`${prefix}deletecommand pog\``)
      .setTimestamp()
      .setFooter({text: 'https://pogy.xyz/'})]})
      .setColor(message.guild.me.displayHexColor)

      if (name.length > 30) return message.channel.send(`${message.client.emoji.fail} ${language.cc1}`);
  
      
      customCommand.findOne({ 
        guildId: message.guild.id,
        name
      }, async(err, data) => {

        if (data) {
          data.delete({ guildId: message.guild.id, name })
          message.channel.send ({ embeds: [new MessageEmbed().setColor(message.guild.me.displayHexColor).setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
          .setTitle(`${message.client.emoji.success} Delete Command`)
          .setDescription(`${language.deletecmd1} **${name}**`)
          .setTimestamp()
          .setFooter({text: 'https://pogy.xyz/'})]})
        } else {
          message.channel.send(`${message.client.emoji.fail} ${language.deletecmd2}`)
        }
      })
    }
  }