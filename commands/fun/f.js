const discord = require("discord.js");
const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'f',
        description: 'Pay your respect!',
        category: 'Fun',
        cooldown: 3
      });
    }

    async run(message, args) {

        const client = message.client
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
          });
        
          const language = require(`../../data/language/${guildDB.language}.json`)

          
          const target = message.mentions.users.first()



if (!args[0]) {
    message.delete().catch(() => {});
              const embed = new discord.MessageEmbed()
                  .setAuthor(`${message.author.username} has paid their respects.`, message.author.displayAvatarURL({ format: 'png' }))
                  .setColor('PURPLE')
                  .setFooter(`${language.f3}`);
              message.channel.send({ embed }).then(m => m.react('🇫')).catch(() => {});
  
  
          }
          else {
          message.delete().catch(() => {});
              const embed = new discord.MessageEmbed()
                  .setAuthor('\u2000', message.author.displayAvatarURL({ format: 'png' }))
                  .setColor('PURPLE')
                  .setDescription(`${message.author} ${language.f2} ${target}`)
                  .setFooter(`${language.f3}`);
              message.channel.send({ embed }).then(m => m.react('🇫')).catch(() => {});
  
          }
  
    }
};