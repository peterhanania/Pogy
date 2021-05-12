const Command = require('../../structures/Command');
const request = require('request-promise-native');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
const { Canvas } = require("canvacord");
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'pornhubcomment',
        aliases: [ 'phcomment', 'phubcomment' ],
        description: 'Make your own HUB text!',
        category: 'Images',
        usage: '<text>',
        examples: [ 'pornhub Hello there' ],
        cooldown: 5
      });
    }

    async run(message, args) {
      const client = message.client;
      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
  
      const language = require(`../../data/language/${guildDB.language}.json`)

      let text = args.slice(0).join(" ")
      if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.changeErrorValid}`));
      
        if(text.length > 50) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.phubErrorCharacter}`));
    
        Canvas.phub({ username: message.author.username, message: text, image: message.author.displayAvatarURL({ format: "png" }) })
          .then(attachment => message.channel.send({ files: [{attachment, name: "img.png"}] }))
    }
};