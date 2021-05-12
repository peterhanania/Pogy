const Command = require('../../structures/Command');
const request = require('request-promise-native');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'dog',
        description: 'Get a cute dog picture!',
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
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const img = (await res.json()).message;
        const embed = new discord.MessageEmbed()
          .setImage(img)
          .setFooter('/dog.ceo/api/breeds/image/random')
          .setColor(message.guild.me.displayHexColor)
        message.channel.send(embed);
      } catch (err) {
      console.log(`${err}, command name: dog`)
       message.reply(language.birdError)
  
      }

        }}    