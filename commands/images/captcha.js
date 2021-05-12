const Command = require('../../structures/Command');
const request = require('request-promise-native');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'captcha',
        description: 'Sends you a Captcha image!',
        category: 'Images',
        usage: '<text>',
        examples: [ 'captcha hey Im a robot!' ],
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
        const text = args.join(" ");
     
        if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.changeErrorValid}`));
        if (text.length > 70) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.capchaError}`));
  
        let options = {
          url: 'https://api.alexflipnote.dev/captcha',
          headers: {
            'Authorization': this.client.config.alexflipnoteApiKey
          },
          qs: {
            icon: 1,
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