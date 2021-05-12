const Command = require('../../structures/Command');
const request = require('request-promise-native');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'bird',
        description: 'Get a bird picture!',
        category: 'Images',
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
        const res = await fetch('http://shibe.online/api/birds');
        const img = (await res.json())[0];
        const embed = new discord.MessageEmbed()
          .setImage(img)
          .setFooter(`/shibe.online/api/birds`)
          .setTimestamp()
          .setColor(client.color.red);
        message.channel.send(embed);
   
      } catch (err) {
      console.log(`${err}, command name: bird`)
       message.reply(language.birdError)
  
      }
        }}    