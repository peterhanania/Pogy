const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Guild = require("../../database/schemas/Guild.js");
 const Discord = require("discord.js")

const Logging = require('../../database/schemas/logging.js')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'unban',
        aliases: [ 'ub', 'uban'],
        description: 'unban the specified user from the guild',
        category: 'Moderation',
        usage: '<user-ID>',
        examples: [ 'unban  710465231779790849' ],
        guildOnly: true,
        botPermission: ['BAN_MEMBERS'],
        userPermission: ['BAN_MEMBERS'],
      });
    }

    async run(message, args) {
let client = message.client

/*------ Guild Data ------*/
    const logging = await Logging.findOne({ guildId: message.guild.id })
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

const guildDB = await Guild.findOne({
guildId: message.guild.id
});
const language = require(`../../data/language/${guildDB.language}.json`)

const rgx = /^(?:<@!?)?(\d+)>?$/;





const id = args[0];
if(!id) {
  
const embed = new MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`**Proper Usage:**\n\n\`1-\` unban peter_#4444 appealed\n\`2-\` unban 710465231779790849 appealed\n\`3-\` unban all`)
.setColor(message.client.color.red)
.setFooter({text: 'https://pogy.xyz/'})

message.channel.send({embeds: [embed]})
  return
}

if(id.toString().toLowerCase() == "all"){
  const bannedUsers = await message.guild.fetchBans();
   const users = await message.guild.fetchBans();
   const array = [];

let reason = `Unban All`


        for (const user of users.array()) {
          await message.guild.members.unban(user.user, `${reason} / ${language.unbanResponsible}: ${message.author.tag}`);
          array.push(user.user.tag)
        }

if(!array || !array.length){
const embed = new MessageEmbed()
.setDescription(`${client.emoji.fail} | The current guild has no banned users.`)
.setColor(client.color.green)

message.channel.send({embeds: [embed]}).catch(()=>{})
} else {
const embed = new MessageEmbed()
.setDescription(`${client.emoji.success} | ${language.unbanSuccess} **${array.length}** Users from the guild. \n\n**Users:**\n${array.join(" - ")} ${logging && logging.moderation.include_reason === "true" ?`\n\n**Reason:** ${reason}`:``}`)
.setColor(client.color.green)

message.channel.send({embeds: [embed]})
.then(async(s)=>{
          if(logging && logging.moderation.delete_reply === "true"){
            setTimeout(()=>{
            s.delete().catch(()=>{})
            }, 5000)
          }
        })
        .catch(()=>{});
}


if(logging){
  if(logging.moderation.delete_after_executed === "true"){
  message.delete().catch(()=>{})
}

const role = message.guild.roles.cache.get(logging.moderation.ignore_role);
const channel = message.guild.channels.cache.get(logging.moderation.channel)

  if(logging.moderation.toggle == "true"){
    if(channel){
    if(message.channel.id !== logging.moderation.ignore_channel){
     if(!role || role && !message.member.roles.cache.find(r => r.name.toLowerCase() === role.name)){

if(logging.moderation.ban == "true"){
  
let color = logging.moderation.color;
if(color == "#000000") color = message.client.color.yellow;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

let bannedUsersLength = `${array.length} users`
if(!array || !array.length) bannedUsersLength = 'No users'
if(array.length === 1) bannedUsersLength = '1 User'
const logEmbed = new MessageEmbed()
.setAuthor(`Action: \`UnBan All\` | ${bannedUsersLength} | Case #${logcase}`, message.author.displayAvatarURL({ format: 'png' }))
.addField('Unbanned Users', `${bannedUsersLength}`, true)
.addField('Moderator', message.member, true)
.setTimestamp()
.setColor(color)

if(array.length) logEmbed.addField('**Users:**', array.join(" - "))
channel.send(logEmbed).catch(()=>{})

logging.moderation.caseN = logcase + 1
await logging.save().catch(()=>{})
}
      }
    }
    }
  }
}

} else {


if (!rgx.test(id)) {

let members = client.users.cache.filter(user => user.tag === args[0]).map(user => user.id).toString();


const bannedUsers1 = await message.guild.fetchBans();
const user1 = bannedUsers1.get(members);



if(user1){
let reason = args.slice(1).join(' ');
if (!reason) reason = language.unbanNoReason;
if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

const userrz = bannedUsers1.get(members).user;
if(userrz){
const embed = new MessageEmbed()
.setDescription(`${client.emoji.success} | ${language.unbanSuccess} ${userrz.tag} ${logging && logging.moderation.include_reason === "true" ?`\n\n**Reason:** ${reason}`:``}`)
.setColor(client.color.green)

message.channel.send({embeds: [embed]}).catch(()=>{})
await message.guild.members.unban(userrz, `${reason} / ${language.unbanResponsible}: ${message.author.tag}`).then(async(s)=>{
          if(logging && logging.moderation.delete_reply === "true"){
            setTimeout(()=>{
            s.delete().catch(()=>{})
            }, 5000)
          }
        })
        .catch(()=>{});


//log
if(logging){
    if(logging.moderation.delete_after_executed === "true"){
  message.delete().catch(()=>{})
}
const role = message.guild.roles.cache.get(logging.moderation.ignore_role);
const channel = message.guild.channels.cache.get(logging.moderation.channel)

  if(logging.moderation.toggle == "true"){
    if(channel){
    if(message.channel.id !== logging.moderation.ignore_channel){
      if(!message.member.roles.cache.find(r => r.name.toLowerCase() === role.name)) {

if(logging.moderation.ban == "true"){
  
let color = logging.moderation.color;
if(color == "#000000") color = message.guild.me.displayHexColor;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

let reason = args.slice(1).join(' ');
if (!reason) reason = `${language.noReasonProvided}`;
if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

const logEmbed = new MessageEmbed()
.setAuthor(`Action: \`UnBan\` | ${userrz.tag} | Case #${logcase}`, userrz.displayAvatarURL({ format: 'png' }))
.addField('User', userrz, true)
.addField('Moderator', message.member, true)
.setFooter({text:`ID: ${userrz.id}`})
.setTimestamp()
.setColor(color)

channel.send(logEmbed).catch((e)=>{console.log(e)})

logging.moderation.caseN = logcase + 1
await logging.save().catch(()=>{})
}
      }
    }
    }
  }
}
} else {
  
message.channel.send ({ embeds: [new MessageEmbed()
.setDescription(`${client.emoji.fail} | ${language.unbanInvalidID}`)
.setColor(client.color.red)]});

}


} else {


message.channel.send ({ embeds: [new MessageEmbed()
.setDescription(`${client.emoji.fail} | ${language.unbanInvalidID}`)
.setColor(client.color.red)]});

}
  

  return;
}

const bannedUsers = await message.guild.fetchBans();
const user = bannedUsers.get(id);
if (!user) return message.channel.send ({ embeds: [new MessageEmbed()
.setDescription(`${client.emoji.fail} | ${language.unbanInvalidID}`)
.setColor(client.color.red)]});

let reason = args.slice(1).join(' ');
if (!reason) reason = language.unbanNoReason;
if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

const userr = bannedUsers.get(id).user;
await message.guild.members.unban(user.user, `${reason} / ${language.unbanResponsible}: ${message.author.tag}`);

const embed = new MessageEmbed()
.setDescription(`${client.emoji.success} | ${language.unbanSuccess} ${userr.tag} ${logging && logging.moderation.include_reason === "true" ?`\n\n**Reason:** ${reason}`:``}`)
.setColor(client.color.green)

message.channel.send({embeds: [embed]}).then(async(s)=>{
          if(logging && logging.moderation.delete_reply === "true"){
            setTimeout(()=>{
            s.delete().catch(()=>{})
            }, 5000)
          }
        })
        .catch(()=>{});

if(logging){
    if(logging.moderation.delete_after_executed === "true"){
  message.delete().catch(()=>{})
}
const role = message.guild.roles.cache.get(logging.moderation.ignore_role);
const channel = message.guild.channels.cache.get(logging.moderation.channel)

  if(logging.moderation.toggle == "true"){
    if(channel){
    if(message.channel.id !== logging.moderation.ignore_channel){
      if(!message.member.roles.cache.find(r => r.name.toLowerCase() === role.name)) {

if(logging.moderation.ban == "true"){
  
let color = logging.moderation.color;
if(color == "#000000") color = message.guild.me.displayHexColor;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

let reason = args.slice(1).join(' ');
if (!reason) reason = `${language.noReasonProvided}`;
if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

const logEmbed = new MessageEmbed()
.setAuthor(`Action: \`UnBan\` | ${userr.tag} | Case #${logcase}`, userr.displayAvatarURL({ format: 'png' }))
.addField('User', userr, true)
.addField('Moderator', message.member, true)
.setFooter({text:`ID: ${userr.id}`})
.setTimestamp()
.setColor(color)

channel.send(logEmbed).catch((e)=>{console.log(e)})

logging.moderation.caseN = logcase + 1
await logging.save().catch(()=>{})
}
      }
    }
    }
  }
}

    }

    }
};