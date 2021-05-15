const muteModel = require('../models/mute');
const Event = require('../structures/Event');
const logger = require('../utils/logger');
const Maintenance = require('../database/schemas/maintenance')
const MessageEmbed = require('discord.js');
const Discord = require('discord.js');
const config = require('../config.json');
const webhookClient = new Discord.WebhookClient(config.webhook_id, config.webhook_url);

module.exports = class extends Event {
    async run(rl) {

 const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`**Time out**\n\`${rl.timeout}ms\`\n**Limit:**\n\`${rl.limit}\`\n\n__**Information**__\n**Method:**${rl.method}\n\n**Path:**\n${rl.path} ${rl.route}`)
        .setTimestamp()
      
      	await setTimeout(function () {
    webhookClient.send(embed)
		logger.info(`Time out: ${rl.timeout}ms. Limit: ${rl.limit}`, {label: 'Rate Limit'});

	}, rl.timeout + 10);

     
    }
}
