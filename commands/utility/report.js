const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const ms = require('ms');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'report',
        description: 'Enable server reports!',
        category: 'Utility',
        usage: [ '<enable #channel | disable> / report @user / ID <reason>' ],
        examples: [ 'report enable #sserver-reports', 'report disable', 'report 232327382392 IP logging' ],
        cooldown: 3,
        botPermission: ["ADD_REACTIONS"]
      });
    }

    async run(message, args) {

      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
      

      const language = require(`../../data/language/${guildDB.language}.json`);
      
let prefix = guildDB.prefix;
let fail = message.client.emoji.fail;
let serverCase = guildDB.report.reportCase;
if(!serverCase || serverCase === null) serverCase = '1';
let client = message.client

let reportColor = guildDB.report.reportcolor
if(reportColor == '#000000') reportColor = message.guild.me.displayHexColor

  let user = message.mentions.users.first() || client.users.cache.get(args[1])

      let properUsage = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${language.reportt1.replace(/{prefix}/g, `${prefix}`)}`)
        .setFooter('https://pogy.xyz')

      if (args.length < 1) {
        return message.channel.send(properUsage);
      }

 
      if (args.includes('disable') || args.includes('off')) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send( new MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${fail} ${language.missingUser}`)
    .setDescription(`${language.missingUser1}`)
    .setTimestamp()
    .setFooter('https://pogy.xyz')
    .setColor(message.guild.me.displayHexColor));

        if(guildDB.report.reportChannelID === null) return message.channel.send( new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.client.emoji.fail} ${language.report4}`)
        .setFooter('https://pogy.xyz'));
        await Guild.findOne({
          guildId: message.guild.id
      }, async (err, guild) => {
          guild.report.reportChannelID = null
          await guild.save().catch(()=>{})
  
          return message.channel.send( new MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setDescription(`${message.client.emoji.success} ${language.report5}`)
          .setFooter('https://pogy.xyz')); 
        });
        return;
      } else if (args.includes('enable')) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send( new MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${fail} ${language.missingUser}`)
    .setDescription(`${language.missingUser1}`)
    .setTimestamp()
    .setFooter('https://pogy.xyz')
    .setColor(message.guild.me.displayHexColor));

      const channel = await message.mentions.channels.first();

      if (!channel)  return message.channel.send(properUsage)
    if(guildDB.report.reportChannelID === channel.id) return message.channel.send( new MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setDescription(`${fail} ${channel} ${language.report6}`)
          .setFooter('https://pogy.xyz')); 
      await Guild.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {
      guild.report.reportChannelID = channel.id;
          await guild.save().catch(()=>{})
  

        return message.channel.send( new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.client.emoji.success} ${language.report7} ${channel}`)); 
      });
    } else if (args.includes('issue')){

if(guildDB.report.disableIssue == "true"){
const embed = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Issue Reports are disabled in the current guild ${message.client.emoji.fail}`)

return message.channel.send(embed); 
}
const serverReports = guildDB.report.reportChannelID;
const channel = message.guild.channels.cache.get(serverReports);
if(!channel) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report11}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));


 var acceptReason = args.splice(1).join(' ');
 if(!acceptReason) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report12}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));

if(acceptReason.length < 5) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report13}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));

   if(acceptReason.length > 600 || args.join(' ').length > 600) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report14}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));


let dmEmbed = new MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${language.report15}`)
.setFooter('https://pogy.xyz')
.setTimestamp()
.setColor(message.client.color.green)

let reportEmbed1 = new MessageEmbed()
.setAuthor(`${language.report16} (Issue)`)
.setDescription(`**${language.report17}**`)
.addField(`${language.report18}`, message.member, true)
.addField(`${language.report19}`, message.member.id, true)
.addField(`${language.report20}`, message.author.tag, true)
.addField(`${language.report24}`, message.channel, true)
.addField(`${language.report25}`, `${moment(new Date()).format("dddd, MMMM Do YYYY")}`, true)
.addField(`${language.report26}`, `${language.report29} #${serverCase}`, true)
.addField(`${language.report27}`, `\`\`\`${acceptReason}\`\`\``)
.setFooter(message.author.tag,  message.author.displayAvatarURL({ dynamic: true }))
.setTimestamp()
.setColor(reportColor);


guildDB.report.reportCase =  serverCase + 1;
await guildDB.save().catch(()=>{})

channel.send(reportEmbed1).then(async(reportEmbed) => {
if(guildDB.isPremium == "true"){
if(guildDB.report.upvote == "true"){
  if(guildDB.report.reaction == "1"){

reportEmbed.react('⬆️').catch(()=>{})
await delay(750);
reportEmbed.react('⬇️').catch(()=>{}) 


  } else if(guildDB.report.reaction == "2"){

reportEmbed.react('👍').catch(()=>{})
await delay(750);
reportEmbed.react('👎').catch(()=>{}) 

  } else if(guildDB.report.reaction == "3"){

reportEmbed.react('✅').catch(()=>{})
await delay(750);
reportEmbed.react('❌').catch(()=>{})

  } else {
reportEmbed.react('⬆️').catch(()=>{})
await delay(750);
reportEmbed.react('⬇️').catch(()=>{})

  }
}
}

}).catch(err => {return message.channel.send(`${language.report28}`)})


message.delete().catch(() => {})
message.author.send(dmEmbed).catch(()=>{})
      
    } else if(args.includes('user')){
 if(guildDB.report.disableUser == "true"){
message.channel.send( new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`User Reports are disabled in the current guild ${message.client.emoji.fail}`)); 
  return;
}     
if(!user) return message.channel.send(properUsage)
if(user.id === message.author.id) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report8}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));

if(user.bot) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report9}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));

if(!guildDB.report.reportChannelID || !guildDB.report.reportChannelID === null) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report10}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));

let serverReports = guildDB.report.reportChannelID
let channel = message.guild.channels.cache.get(serverReports)
if(!channel) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report11}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));


 var acceptReason = args.splice(2).join(' ');
 if(!acceptReason) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report12}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));

if(acceptReason.length < 5) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report13}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));

   if(acceptReason.length > 600 || args.join(' ').length > 600) return message.channel.send(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${fail} ${language.report14}`).setFooter('https://pogy.xyz').setTimestamp().setColor('RED'));


let dmEmbed = new MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`${language.report15}`)
.setFooter('https://pogy.xyz')
.setTimestamp()
.setColor(message.client.color.green)

let reportEmbed1 = new MessageEmbed()
.setAuthor(`${language.report16} (User)`)
.setDescription(`**${language.report17}**`)
.addField(`${language.report18}`, message.member, true)
.addField(`${language.report19}`, message.member.id, true)
.addField(`${language.report20}`, message.author.tag, true)
.addField(`${language.report21}`, user, true)
.addField(`${language.report22}`, user.id, true)
.addField(`${language.report23}`, user.tag, true)
.addField(`${language.report24}`, message.channel, true)
.addField(`${language.report25}`, `${moment(new Date()).format("dddd, MMMM Do YYYY")}`, true)
.addField(`${language.report26}`, `${language.report29} #${serverCase}`, true)
.addField(`${language.report27}`, `\`\`\`${acceptReason}\`\`\``)
.setFooter(message.author.tag,  message.author.displayAvatarURL({ dynamic: true }))
.setTimestamp()
.setColor(reportColor);


guildDB.report.reportCase =  serverCase + 1;
await guildDB.save().catch(()=>{})
channel.send(reportEmbed1).then(async(reportEmbed) => {
if(guildDB.isPremium == "true"){
if(guildDB.report.upvote == "true"){
  if(guildDB.report.reaction == "1"){
reportEmbed.react('⬆️').catch(()=>{})
await delay(750);
reportEmbed.react('⬇️').catch(()=>{}) 


  } else if(guildDB.report.reaction == "2"){
reportEmbed.react('👍').catch(()=>{})
await delay(750);
reportEmbed.react('👎').catch(()=>{})

  } else if(guildDB.report.reaction == "3"){
reportEmbed.react('✅').catch(()=>{})
await delay(750);
reportEmbed.react('❌').catch(()=>{}) 

  } else {
reportEmbed.react('⬆️').catch(()=>{})
await delay(750);
 reportEmbed.react('⬇️').catch(()=>{}) 

  }
}
}

}).catch(err => {return message.channel.send(`${language.report28}`)})


message.delete().catch(() => {})
message.author.send(dmEmbed).catch(()=>{})
    } else if(args[0]) {
     message.channel.send(properUsage) 
    } else {
 message.channel.send(properUsage) 

    }
    }
};

          function match(msg, i) {
          if (!msg) return undefined;
          if (!i) return undefined;
          let user = i.members.cache.find(
            m =>
              m.user.username.toLowerCase().startsWith(msg) ||
              m.user.username.toLowerCase() === msg ||
              m.user.username.toLowerCase().includes(msg) ||
              m.displayName.toLowerCase().startsWith(msg) ||
              m.displayName.toLowerCase() === msg ||
              m.displayName.toLowerCase().includes(msg)
          );
          if (!user) return undefined;
          return user.user;
        }

        function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}