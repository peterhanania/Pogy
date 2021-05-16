const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const discord = require("discord.js");
const zalgo = require('zalgolize');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'zalgo',
        aliases: ['zalgolize'],
        description: 'Make the bot zalgolize a message',
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

          if(!args[0]) return message.channel.send(`${language.zalgolize}`)

          message.channel.send(new discord.MessageEmbed().setColor(client.color.blue).setDescription(`\u180E${zalgo(args, 0.2, [10, 5, 10])}`));

  
    }
};
