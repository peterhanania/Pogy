const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
const request = require('request-promise-native');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'facts',
        aliases:['fact'],
        description: 'make a fact',
        category: 'Images',
        usage: '<text>',
        examples: [ 'facts Im pog' ],
        cooldown: 5
      });
    }

    async run(message, args) {

      const client = message.client;
      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
  
      const language = require(`../../data/language/${guildDB.language}.json`)

      try {
        let text = args.slice(0).join(" ")
        if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.changeErrorValid}`));
        
          if(text.length > 60) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.clydeError}`));
        let options = {
          url: 'https://api.alexflipnote.dev/facts',
          headers: {
            'Authorization': this.client.config.alexflipnoteApiKey
          },
          qs: {
            text: args.join(' ').split('').join('')
          },
          encoding: null
        };
      
        let response = await request(options);
      
        await message.channel.send({
          files: [ response ]
        });
      } catch(error) {
        this.client.emit("apiError", error, message);
      }
    }
};