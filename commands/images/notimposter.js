const Command = require('../../structures/Command');
const request = require('request-promise-native');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'notimpostor',
        aliases:['notimposter'],
        description: 'Someone was not the impostor',
        category: 'Images',
        usage: '<text>',
        examples: [ 'notimpostor Peter' ],
        cooldown: 5,
        guildOnly: true
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
        if(text.length > 40) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.floorError}`));
        //https://vacefron.nl/api/ejected?name=[MESSAGE]&imposter=true&crewmate=red
        let options = {
          url: 'https://vacefron.nl/api/ejected',
          qs: {
            name: args.join(' ').split('').join(''),
            imposter: false,
            crewmate: 'red'
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