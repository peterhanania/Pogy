const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'catfact',
        aliases: [ 'catfacts', 'cf' ],
        description: 'Generate a random useless cat facts',
        category: 'Fun',
        cooldown: 3
      });
    }

    async run(message) {
  
    
      const res = await fetch('https://catfact.ninja/fact').catch(() => {});
      const fact = (await res.json()).fact;
      const embed = new MessageEmbed()
        .setDescription(fact)
        .setFooter(`/catfact.ninja/fact`)
        .setTimestamp()
        .setColor(message.client.color.blue);
      message.channel.send(embed).catch(() => {});

    }
};