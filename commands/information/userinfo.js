const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/schemas/Guild');
const User = require('../../database/schemas/User');
const Nickname = require('../../database/schemas/nicknames');

const Usernames = require('../../database/schemas/usernames');
const moment = require('moment');
const emojis = require('../../assets/emojis.json');
const statuses = {
  online: `${emojis.online} \`Online\``,
  idle: `${emojis.idle} \`AFK\``,
  offline: `${emojis.offline} \`Offline\``,
  dnd: `${emojis.dnd} \`Do Not Disturb\``
};
const flags = {
  DISCORD_EMPLOYEE: `${emojis.discord_employee} \`Discord Employee\``,
  DISCORD_PARTNER: `${emojis.discord_partner} \`Partnered Server Owner\``,
  BUGHUNTER_LEVEL_1: `${emojis.bughunter_level_1} \`Bug Hunter (Level 1)\``,
  BUGHUNTER_LEVEL_2: `${emojis.bughunter_level_2} \`Bug Hunter (Level 2)\``,
  HYPESQUAD_EVENTS: `${emojis.hypesquad_events} \`HypeSquad Events\``,
  HOUSE_BRAVERY: `${emojis.house_bravery} \`House of Bravery\``,
  HOUSE_BRILLIANCE: `${emojis.house_brilliance} \`House of Brilliance\``,
  HOUSE_BALANCE: `${emojis.house_balance} \`House of Balance\``,
  EARLY_SUPPORTER: `${emojis.early_supporter} \`Early Supporter\``,
  TEAM_USER: 'Team User',
  SYSTEM: 'System',
  VERIFIED_BOT: `${emojis.verified_bot} \`Verified Bot\``,
  VERIFIED_DEVELOPER: `${emojis.verified_developer} \`Early Verified Bot Developer\``
};

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'userinfo',
        aliases: ['ui', 'user', 'whois'],
        description: 'Displays information about a provided user.',
        category: 'Information',
        usage: '[user]',
        examples: [ 'userinfo', 'userinfo 267386908382855169' ],
        guildOnly: true,
        cooldown: 3
      });
    }

    async run(message, args) {
      const client = message.client

            const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
  



let member = message.mentions.members.last() || message.member;
 
     
     if(!member) {

      try {

       member = await message.guild.members.fetch(args[0])

     } catch {

member = message.member;

     }
        
        

       }

      
        let userFind = await User.findOne({
        discordId: member.id
      });
      
      if(!userFind){
              const newUser = new User({
              discordId: member.id
            })
  
            newUser.save()
             userFind = await User.findOne({
        discordId: member.id
      });

      }
let badge;
if(userFind && userFind.badges){
badge = userFind.badges.join(" ")
if(!badge || !badge.length) badge = `\`None\``
} else {
  badge = `\`None\``
}

let usernames = []

// user  tags
let userName = await Usernames.findOne({
  discordId: member.id
})
if(!userName){

const newUser = new Usernames({
              discordId: member.id
})
  
newUser.save()


usernames = `No Tags Tracked`;

} else {


usernames = userName.usernames.join(' - ')
if(!userName.usernames.length) usernames = `No Tags Tracked`


}



      
let nickname = []

// user nicknames
const nicknames = await Nickname.findOne({
discordId: member.id,
guildId: message.guild.id
})
if(!nicknames){

const newUser = new Nickname({
              discordId: member.id,
              guildId: message.guild.id
})
  
newUser.save()


nickname = `No Nicknames Tracked`
} else {

  nickname = nicknames.nicknames.join(" - ")
  if(!nicknames.nicknames.length) nickname = `No Nicknames Tracked`

}

 
    const userFlags = (await member.user.fetchFlags()).toArray();
    const activities = [];
    let customStatus;
    for (const activity of member.presence.activities.values()) {
      switch (activity.type) {
        case 'PLAYING':
          activities.push(`Playing **${activity.name}**`);
          break;
        case 'LISTENING':
          if (member.user.bot) activities.push(`Listening to **${activity.name}**`);
          else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
          break;
        case 'WATCHING':
          activities.push(`Watching **${activity.name}**`);
          break;
        case 'STREAMING':
          activities.push(`Streaming **${activity.name}**`);
          break;
        case 'CUSTOM_STATUS':
          customStatus = activity.state;
          break;
      }
    }
    
    // Trim roles
let rolesNoob;
let roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);

rolesNoob = roles.join(" ")
if(member.roles.cache.size < 1) rolesNoob = "No Roles"


if(!member.roles.cache.size || member.roles.cache.size - 1 < 1) roles = `\`None\``
    const embed = new MessageEmbed()
   

    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic : true }))
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`ID: ${member.id}`)
      .setTimestamp()
      .setColor(member.displayHexColor)
      .setDescription(`**• ${language.userh}** \`${member.user.username}\` | \`#${member.user.discriminator}\`\n** • ID:** \`${member.id}\`\n**• ${language.joinedDiscord}** \`${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\`\n**• ${language.joinedServer}** \`${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\`\n**• Roles [${roles.length || '0'}]: ** ${rolesNoob || `\`${language.noRoles}\``}\n\n**• ${language.badgeslmao}** ${userFlags.map(flag => flags[flag]).join('\n') || `\`${language.noBadge}\``}\n**• ${language.botBadges}** ${badge ||`\`None\``}\n**• Last 5 Nicknames:**\n\`\`\`${nickname || `No Nicknames Tracked`}\`\`\`**• Last 5 Tags:**\n\`\`\`${usernames || `No Tags Tracked`}\`\`\` `)


      
      
    message.channel.send(embed);

    }
};