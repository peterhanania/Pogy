const Event = require('../../structures/Event');
const Discord = require('discord.js');
const logger = require('../../utils/logger');
const Guild = require('../../database/schemas/Guild');
const metrics = require('datadog-metrics');
const Logging = require('../../database/schemas/logging');
const config = require('../../config.json');
const webhookClient = new Discord.WebhookClient(config.webhook_id, config.webhook_url);
const welcomeClient = new Discord.WebhookClient(config.webhook_id, config.webhook_url);
module.exports = class extends Event {

  async run(guild) {
      const shardGuildCounts = await this.client.shard.fetchClientValues('guilds.cache.size')
      const totalGuildCount = shardGuildCounts.reduce((total, current) => total + current)
      
      
    Guild.findOneAndDelete({
      guildId: guild.id,
    }, (err, res) => {
      if (err) console.log(err)
      logger.info(`Left from "${guild.name}" (${guild.id})`, { label: 'Guilds' })
    })

    const welcomeEmbed  = new Discord.MessageEmbed()
   .setColor(`RED`)
    .setTitle('Leave Server')
    .setThumbnail(`https://pogy.xyz/logo`)
    .setDescription(`Pogy left a Server!`)
    .addField(`Server Name`, `\`${guild.name}\``, true)
    .addField(`Server ID`, `\`${guild.id}\``, true)
    .setFooter(`${totalGuildCount} guilds `,  'https://pogy.xyz/logo.png');

welcomeClient.send({
   username: 'Pogy',
        avatarURL: 'https://pogy.xyz/logo.png',
        embeds: [welcomeEmbed],
})

Logging.findOneAndDelete({
      guildId: guild.id,
    }).catch(()=>{});

if(config.datadogApiKey){
      metrics.init({ apiKey: this.client.config.datadogApiKey, host: 'pogy', prefix: 'pogy.' });
      metrics.increment('guildDelete');
}

      const embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`I have left the ${guild.name} server.`)
      .setFooter(`Lost ${guild.members.cache.size - 1} members • I'm now in ${totalGuildCount} servers..\n\nID: ${guild.id}`)
      .setThumbnail(guild.iconURL({ dynamic: true }) ? guild.iconURL({ dynamic: true }) : `https://guild-default-icon.herokuapp.com/${encodeURIComponent(guild.nameAcronym)}`)
      .addField('Server Owner', `${guild.owner} / ${guild.ownerID}`)
    
      webhookClient.send({
        username: 'Pogy',
        avatarURL: 'https://pogy.xyz/logo.png',
        embeds: [embed],
      });
    
  }
};
