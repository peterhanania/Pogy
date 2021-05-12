const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'dogfact',
        aliases: ['df'],
        description: 'Generate a random useless dog facts',
        category: 'Fun',
        cooldown: 3,
      });
    }

    async run(message) {
  
      const res = await fetch('https://dog-api.kinduff.com/api/facts');
      const fact = (await res.json()).facts[0];

      const embed = new MessageEmbed()
        .setDescription(fact)
        .setFooter(`/dog-api.kinduff/api/fact`)
        .setTimestamp()
        .setColor(message.client.color.blue);
      message.channel.send(embed).catch(() => {});

    }
};