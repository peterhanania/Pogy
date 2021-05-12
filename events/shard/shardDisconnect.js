const Event = require('../../structures/Event');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const logger = require('../../utils/logger');
const webhookClient = new Discord.WebhookClient('', '');

module.exports = class extends Event {
  constructor(...args) {
    super(...args)
  }

  async run() {
    logger.error(`Shard ${this.client.shard.ids - 1 + 2}/${this.client.shard.count} has disconnected`, { label: `Shard` })
    


      const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Pogy: [${this.client.shard.ids - 1 + 2}/${this.client.shard.count}] Disconnected`)
        .setTimestamp()
      
      webhookClient.send(embed)
    
  }
}