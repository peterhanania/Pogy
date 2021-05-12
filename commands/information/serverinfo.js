const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')
const Guild = require('../../database/schemas/Guild');
const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: 'High',
	VERY_HIGH: 'Highest'
};
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

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'serverinfo',
        aliases: [ 'server', 'si', 'guildinfo', 'info' ],
        description: 'Displays information about the current server.',
        category: 'Information',
        guildOnly: true,
        cooldown: 3
      });
    }

    async run(message) {

      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)

     const embed = new MessageEmbed() 
     .setFooter(`Shard #${message.guild.shardID}`)
.setAuthor(message.guild.name, message.guild.iconURL)
.addField(`${language.nameS}`, message.guild.name, true)
.addField("ID", message.guild.id, true)
.addField(`${language.owner}`, `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
.addField(`${language.region}`, message.guild.region, true)
.addField(`${language.serverInfo1}`, `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
.addField(`${language.verificationLevel}`, message.guild.verificationLevel, true)
.addField(`${language.channels}`, message.guild.channels.cache.size, true)
.addField(`${language.roleCount}`, message.guild.roles.cache.size, true)
.addField(`Created at`, `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} **(${checkDays(message.channel.guild.createdAt)})**`, true)
.setThumbnail(message.guild.iconURL())
.setColor(message.guild.me.displayHexColor);
    message.channel.send({embed});
}
};