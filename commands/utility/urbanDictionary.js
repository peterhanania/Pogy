const Command = require('../../structures/Command');
const request = require('request-promise-native');
const Guild = require('../../database/schemas/Guild');
const Discord = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'define',
        aliases: [ 'urban', 'usearch', 'urbandictionary' ],
        description: 'Defines the given word!',
        category: 'Utility',
        usage: '<word>',
        examples: [ 'define Poggers' ],
        cooldown: 3
      });
    }

    async run(message, args) {
 const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      

      if (args.length < 1) {
        return message.channel.send( new Discord.MessageEmbed()
.setColor(message.client.color.blue)
.setDescription(`${message.client.emoji.fail} ${language.define1}`));
      }
      
      let options = {
        url: `https://api.urbandictionary.com/v0/define?term=${args.join(' ')}`,
        json: true
      };

      let response = await request(options);
    
      response = response.list[0];
    
      if (!response) {
        return message.channel.send( new Discord.MessageEmbed()
.setColor(message.client.color.blue)
.setDescription(`${message.client.emoji.fail} ${language.define2}`));
      }
    
    
      await message.channel.send({
        embed: {
          color: message.client.color.blue,
          title: 'Urban Dictionary',
          fields: [
            {
              name: `${language.namse}`,
              value: response.word || args.join(' ')
            },
            {
              name: `${language.define3}`,
              value: response.definition || '-'
            },
            {
              name: `${language.define4}`,
              value: response.example || '-'
            }
          ],
          footer: {
            text: `${language.define5}`
          }
        }
      });
    }
};