const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Guild = require("../../database/schemas/Guild.js");
const Economy = require("../../models/economy.js")
const mongoose = require("mongoose")
const Logging = require('../../database/schemas/logging.js')

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'addrole',
        aliases: [ 'addr' ],
        description: 'Adds the specified role to the mentioned user',
        category: 'Moderation',
        usage: '<user>',
        examples: [ 'addrole @peter' ],
        guildOnly: true,
        botPermission: ['MANAGE_ROLES'],
        userPermission: ['MANAGE_ROLES'],

      });
    }

    async run(message, args) {
     /*------ Guild Data ------*/

const client = message.client;
const fail = client.emoji.fail;
const success = client.emoji.success;

  const settings = await Guild.findOne({
    guildId: message.guild.id
}, (err, guild) => {
    if (err) console.error(err)
    if (!guild) {
        const newGuild = new Guild({
          _id: mongoose.Types.ObjectId(),
          guildId: message.guild.id,
          guildName: message.guild.name,
          prefix: client.config.prefix,
          language: "english"
        })

        newGuild.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));

        return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
    }
});
  const logging = await Logging.findOne({ guildId: message.guild.id })
const guildDB = await Guild.findOne({
guildId: message.guild.id
});
const language = require(`../../data/language/${guildDB.language}.json`)



       const member = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])

    if (!member)
      return message.channel.send( new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`${fail} Invalid User`)
      .setDescription(`Please Mention a Valid user mention / user ID`)
      .setTimestamp()
      .setFooter('https://pogy.xyz')
      .setColor(message.guild.me.displayHexColor));
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send( new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`${fail} Role Error`)
      .setDescription(`The Provided Role has an equal or higher role than you.`)
      .setTimestamp()
      .setFooter('https://pogy.xyz')
      .setColor(message.guild.me.displayHexColor));

    const role = getRoleFromMention(message, args[1]) || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rl => rl.name.toLowerCase() === args.slice(1).join(' ').toLowerCase())

    let reason = `The current Feature doesnt need a reason`
    if (!reason) reason = `No Reason Provided`;
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    if (!role)
      return message.channel.send( new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`${fail} Invalid Role`)
      .setDescription(`Please Provide a Valid Role / Role ID`)
      .setTimestamp()
      .setFooter('https://pogy.xyz')
      .setColor(message.guild.me.displayHexColor));
    else if (member.roles.cache.has(role.id)) // If member already has role
      return message.channel.send( new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`${fail} Role Error`)
      .setDescription(`The user already has that role.`)
      .setTimestamp()
      .setFooter('https://pogy.xyz')
      .setColor(message.guild.me.displayHexColor));
    else {
      try {


        await member.roles.add(role, [`Role Add / Responsible User: ${message.author.tag}`]);
        const embed = new MessageEmbed()
         
          .setDescription(`${success} | Added** ${role.name}** to **${member.user.tag}**`)
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed)
        .then(async(s)=>{
          if(logging && logging.moderation.delete_reply === "true"){
            setTimeout(()=>{
            s.delete().catch(()=>{})
            }, 5000)
          }
        })
        .catch(()=>{});


        if(logging){
  
const role = message.guild.roles.cache.get(logging.moderation.ignore_role);
const channel = message.guild.channels.cache.get(logging.moderation.channel)

if(logging.moderation.delete_after_executed === "true"){
  message.delete().catch(()=>{})
}

  if(logging.moderation.toggle == "true"){
    if(channel){
    if(message.channel.id !== logging.moderation.ignore_channel){
        if(!role || role && !message.member.roles.cache.find(r => r.name.toLowerCase() === role.name)){

if(logging.moderation.role == "true"){
  
let color = logging.moderation.color;
if(color == "#000000") color = message.client.color.green;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

const logEmbed = new MessageEmbed()
.setAuthor(`Action: \`Add Role\` | ${member.user.tag} | Case #${logcase}`, member.user.displayAvatarURL({ format: 'png' }))
.addField('User', member, true)
.addField('Moderator', message.member, true)
.setFooter(`ID: ${member.id}`)
.setTimestamp()
.setColor(color)

channel.send(logEmbed).catch(()=>{})

logging.moderation.caseN = logcase + 1
await logging.save().catch(()=>{})
}
      }
    }
    }
  }
}


      } catch {
        return message.channel.send(`Seems like my role is below, please rearrange the roles!`)
      }
    }  

    }
};

 function getRoleFromMention(message, mention) {
    if (!mention) return;
    const matches = mention.match(/^<@&(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return message.guild.roles.cache.get(id);
  }