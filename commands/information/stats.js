const Command = require('../../structures/Command');
const { MessageEmbed, version: djsversion } = require('discord.js');
const { mem, cpu, os } = require('node-os-utils');
const { oneLine, stripIndent } = require('common-tags');
const moment = require('moment');
const ms = require("parse-ms")
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'stats',
        aliases: ['s', 'botinfo'],
        description: 'Displays Pogy\s Statistics',
        category: 'Information',
        cooldown: 3
      });
    }

    async run(message, client) {
      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      let uptime = this.client.shard ? await this.client.shard.broadcastEval('this.uptime') : this.client.uptime;
      if (uptime instanceof Array) {
        uptime = uptime.reduce((max, cur) => Math.max(max, cur), -Infinity);
      }
      let seconds = uptime / 1000;
      let days = parseInt(seconds / 86400);
      seconds = seconds % 86400;
      let hours = parseInt(seconds / 3600);
      seconds = seconds % 3600;
      let minutes = parseInt(seconds / 60);
      seconds = parseInt(seconds % 60);
    
      uptime = `${seconds}s`;
      if (days) {
        uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
      else if (hours) {
        uptime = `${hours}h ${minutes}m ${seconds}s`;
      }
      else if (minutes) {
        uptime = `${minutes}m ${seconds}s`;
      }

      const shardGuildCounts = await this.client.shard.fetchClientValues('guilds.cache.size')
      const totalGuildCount = shardGuildCounts.reduce((total, current) => total + current)
      const shardUserCounts = await this.client.shard.fetchClientValues('users.cache.size')
      const totalUserCount = shardUserCounts.reduce((total, current) => total + current)
      const shardChannelCounts = await this.client.shard.fetchClientValues('users.cache.size')
      const totalChannelCount = shardUserCounts.reduce((total, current) => total + current)

      let rss = client.shard ? await client.shard.broadcastEval('process.memoryUsage().rss') : process.memoryUsage().rss;
      if (rss instanceof Array) {
        rss = rss.reduce((sum, val) => sum + val, 0);
      }
      let heapUsed = client.shard ? await client.shard.broadcastEval('process.memoryUsage().heapUsed') : process.memoryUsage().heapUsed;
      if (heapUsed instanceof Array) {
        heapUsed = heapUsed.reduce((sum, val) => sum + val, 0);
      }

      const { totalMemMb, usedMemMb } = await mem.info();
    const serverStats = stripIndent`
      OS -- ${await os.oos()}
      CPU -- ${cpu.model()}
      Cores -- ${cpu.count()}
      CPU Usage -- ${await cpu.usage()} %
      RAM -- ${totalMemMb} MB
      RAM Usage -- ${(heapUsed / 1024 / 1024).toFixed(2)} MB 

    `;


    const tech = stripIndent`
      Ping -- ${Math.round(message.client.ws.ping)}ms
      Uptime  -- ${uptime}
      ${language.pogyVersion} -- 2.0
      Library -- Discord.js v12.5.1
      Environment -- Node.js v12.18.4
      Servers -- ${totalGuildCount}
      ${language.users} -- ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}
      ${language.channels} -- ${message.client.channels.cache.size}
      Shards -- ${this.client.shard ? `${this.client.shard.count}` : 'None'}
      ${language.pogyCommands} -- ${message.client.commands.size}
      Aliases -- ${message.client.aliases.size}
    `;

     const devs= stripIndent`
     -------
     ${language.pogyOwners}
    • Peter_#4444

     ${language.pogyDevelopers}
    • Peter_#4444

     ${language.pogyContributor}
    • GhostSlayer#0001
    • ΛCЄ#0001
    -------
    `;
    const embed = new MessageEmbed()
      .setAuthor(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`${language.pogyInfo}`)
      .addField(`${language.pogyGeneral}`, `\`\`\`css\n${tech}\`\`\``, true)
      .addField(`${language.pogyTeam}`, `\`\`\`css\n${devs}\`\`\``, true)
      .addField(`${language.pogyStats}`, `\`\`\`css\n${serverStats}\`\`\``)
      .setFooter(`Shard #${message.guild.shardID}`)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
    
    }
};
