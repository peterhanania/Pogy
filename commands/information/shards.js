const Command = require('../../structures/Command');
const MiscUtils = require('../../utils/MiscUtils');
const AsciiTable = require('ascii-table');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'shards',
        aliases: ['shard'],
        description: 'Check\'s stats of a shard',
        category: 'Information',
        cooldown: 3
      });
    }

    async run(message) {
      const table = new AsciiTable()
        .setHeading('Shard', 'Servers', 'Users', 'Ping', 'Uptime')
        .setAlign(0, AsciiTable.CENTER)
        .setAlign(1, AsciiTable.CENTER)
        .setAlign(2, AsciiTable.CENTER)
        .setAlign(3, AsciiTable.CENTER)
        .removeBorder()
      
      const guildCount = await this.client.shard.fetchClientValues('guilds.cache.size')
      const users = await this.client.shard.fetchClientValues('users.cache.size')
      const ping = await this.client.shard.fetchClientValues('ws.ping')

      guildCount.forEach((count, shardId) => {
        table.addRow(shardId, MiscUtils.formatNumber(count), MiscUtils.formatNumber(users[shardId]), `${MiscUtils.formatNumber(ping[shardId])}ms`)
      })


      message.channel.send(new MessageEmbed().setFooter(`Shard #${message.guild.shardID}`).setDescription(`\`\`\`${table.toString()}\`\`\``).setColor(message.guild.me.displayHexColor))
    }
};