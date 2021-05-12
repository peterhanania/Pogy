const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndent } = require('common-tags');

const verificationLevels = {
  NONE: '`None`',
  LOW: '`Low`',
  MEDIUM: '`Medium`',
  HIGH: '`High`',
  VERY_HIGH: '`Highest`'
};
const notifications = {
  ALL: '`All`',
  MENTIONS: '`Mentions`'
};

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'server',
        aliases: [],
        description: 'Check the server',
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message, args) {
     
 function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
  };
  let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
  let region = {
    "eu-central": ":flag_eu: Central Europe",
    "singapore": ":flag_sg: Singapore",
    "us-central": ":flag_us: U.S. Central",
    "sydney": ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. East",
    "us-south": ":flag_us: U.S. South",
    "us-west": ":flag_us: U.S. West",
    "eu-west": ":flag_eu: Western Europe",
    "vip-us-east": ":flag_us: VIP U.S. East",
    "london": ":flag_gb: London",
    "amsterdam": ":flag_nl: Amsterdam",
    "hongkong": ":flag_hk: Hong Kong",
    "russia": ":flag_ru: Russia",
    "southafrica": ":flag_za:  South Africa",
    "brazil": ":flag_br: Brazil"
};
const guildId = args[0];
const guild = message.client.guilds.cache.get(guildId);
if (!guild) return message.channel.send(`Invalid guild ID`)

const embed = new MessageEmbed() 
.setAuthor(guild.name, guild.iconURL())
.addField("Server ID", guild.id, true)
.addField("Owner", `${guild.owner.user.username}#${guild.owner.user.discriminator}`, true)
.addField("Owner ID", `${guild.owner.user.id}`, true)
.addField('Owner Joined Discord on', `\`${moment(guild.owner.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\``, true)
.addField("Region", guild.region, true)
.addField("Total | Humans | Bots", `${guild.members.cache.size} | ${guild.members.cache.filter(member => !member.user.bot).size} | ${guild.members.cache.filter(member => member.user.bot).size}`, true)
.addField("Verification Level", guild.verificationLevel, true)
.addField("Channels", guild.channels.cache.size, true)
.addField("Roles", guild.roles.cache.size, true)
.addField("Creation Date", `${guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(guild.createdAt)})`, true)
.setThumbnail(guild.iconURL())
.setColor(message.guild.me.displayHexColor);
    message.channel.send({embed}).catch(error => {
        message.channel.send(`Error: ${error}`)

  });
    

    }
};
