const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Guild = require("../../database/schemas/Guild.js");
const Economy = require("../../models/economy.js")
const mongoose = require("mongoose")
const ms = require("ms")
const muteModel = require("../../models/mute.js")
const Discord = require("discord.js");
const Logging = require('../../database/schemas/logging.js')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'mute',
        aliases: [ 'm','tempmute' ],
        description: 'Mute the specified user from the guild',
        category: 'Moderation',
        usage: '<user> [time]',
        examples: [ 'mute @Peter 1h Stop spamming' ],
        guildOnly: true,
        botPermission: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
        userPermission: ['MANAGE_ROLES'],
        
      });
    }

    async run(message, args) {
        let client = message.client
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
  
     let mentionedMember = message.mentions.members.last() || message.guild.members.cache.get(args[0]);

    const msRegex = RegExp(/(\d+(s|m|h|w))/)
    let muteRole = await message.guild.roles.cache.get(logging.moderation.mute_role);

     if (!mentionedMember) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${client.emoji.fail} | ${language.banUserValid}`)
            .setColor(client.color.red))
    }
    else if (!msRegex.test(args[1])) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${client.emoji.fail} | ${language.muteTime}`)
            .setColor(client.color.red))
    }

    if (!muteRole) {
        muteRole = await message.guild.roles.create({
            data: {
                name: 'Muted',
                color: 'BLACK',
            }
        }).catch(()=>{})

        logging.moderation.mute_role = muteRole.id;
        await logging.save().catch(()=>{})
    }

    if (mentionedMember.roles.highest.position >= message.guild.me.roles.highest.position) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${client.emoji.fail} | ${language.muteRolePosition}`)
            .setColor(client.color.red))
    }
    else if (muteRole.position >= message.guild.me.roles.highest.position) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${client.emoji.fail} | ${language.muteRolePositionBot}`)
            .setColor(client.color.red))
    }

    const isMuted = await muteModel.findOne({
        guildID: message.guild.id,
        memberID: mentionedMember.user.id,
    })

    if (isMuted) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${client.emoji.fail} | ${language.muteMuted}`)
            .setColor(client.color.red))
    }
let reason = args.slice(1).join(' ');
if (!reason) reason = `${language.noReasonProvided}`;
if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
      let dmEmbed;
if(logging && logging.moderation.mute_action && logging.moderation.mute_action !== "1"){

  if(logging.moderation.mute_action === "2"){
dmEmbed = `${message.client.emoji.fail} You've been muted in **${message.guild.name}** for **${msRegex.exec(args[1])[1]}**`
  } else if(logging.moderation.mute_action === "3"){
dmEmbed = `${message.client.emoji.fail} You've been muted in **${message.guild.name} ** for **${msRegex.exec(args[1])[1]}**\n\n__**Reason:**__ ${reason}`
  } else if(logging.moderation.mute_action === "4"){
dmEmbed = `${message.client.emoji.fail} You've been muted in **${message.guild.name}** for **${msRegex.exec(args[1])[1]}**\n\n__**Moderator:**__ ${message.author} **(${message.author.tag})**\n__**Reason:**__ ${reason}`
  }

mentionedMember.send(new MessageEmbed().setColor(message.client.color.red)
.setDescription(dmEmbed)
).catch(()=>{})
}
    message.channel.send(new Discord.MessageEmbed().setColor(message.client.color.green).setDescription(`${message.client.emoji.success} | Muted **${mentionedMember.user.tag}** for **${msRegex.exec(args[1])[1]}** ${logging && logging.moderation.include_reason === "true" ?`\n\n**Reason:** ${reason}`:``}`)).then(async(s)=>{
          if(logging && logging.moderation.delete_reply === "true"){
            setTimeout(()=>{
            s.delete().catch(()=>{})
            }, 5000)
          }
        })
        .catch(()=>{});

    for (const channel of message.guild.channels.cache) {
        channel[1].updateOverwrite(muteRole, {
            SEND_MESSAGES: false,
            CONNECT: false,
        }).catch(()=>{})
    }

    const noEveryone = mentionedMember.roles.cache.filter(r => r.name !== '@everyone' && !r.managed && r.id !== muteRole.id) 

  let delaynumber = 750;
  if(mentionedMember.roles.cache.size - 1 > 10) delaynumber = 3000;

    if(logging && logging.moderation.remove_roles === "true"){
    for (const role of noEveryone) {
  
 await mentionedMember.roles.remove(role, [`Reason: Mute Command - ${reason} | Responsible User: ${message.author.tag}`]).catch(()=>{})
 await delay(delaynumber);
      
       
    }
    }

    await mentionedMember.roles.add(muteRole.id, [`Mute Command - ${reason} / Responsible User: ${message.author.tag}`]).catch(()=>{})

    const muteDoc = new muteModel({
        guildID: message.guild.id,
        memberID: mentionedMember.user.id,
        length: Date.now() + ms(msRegex.exec(args[1])[1]),
        memberRoles: noEveryone.map(r => r)
    })

    await muteDoc.save().catch(()=>{})
 
 
    
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

if(logging.moderation.mute == "true"){
  
let color = logging.moderation.color;
if(color == "#000000") color = message.client.color.red;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

const logEmbed = new MessageEmbed()
.setAuthor(`Action: \`Mute\` | ${mentionedMember.user.tag} | Case #${logcase}`, mentionedMember.user.displayAvatarURL({ format: 'png' }))
.addField('User', mentionedMember, true)
.addField('Moderator', message.member, true)
.addField('Length',  msRegex.exec(args[1])[1], true)
.setFooter(`ID: ${mentionedMember.id}`)
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
        
        setTimeout(async () => {
        const isMuted = await muteModel.findOne({
        guildID: message.guild.id,
        memberID: mentionedMember.user.id,
    })
    

        let muteRole = await message.guild.roles.cache.get(logging.moderation.mute_role);

  
    await mentionedMember.roles.remove(muteRole.id, [`Mute Command / Responsible User: ${message.author.tag}`]).catch(()=>{})


    if(logging && logging.moderation.remove_roles === "true"){
    for (const role of isMuted.memberRoles) {
 const roleM = await message.guild.roles.cache.get(role);
if(roleM){
 await mentionedMember.roles.add(roleM, ["Mute Command, mute duration expired."]).catch(()=>{})
 await delay(750);
}
 
    }
    }

     await isMuted.deleteOne().catch(()=>{})
      




                    if(logging){
  
const role = message.guild.roles.cache.get(logging.moderation.ignore_role);
const channel = message.guild.channels.cache.get(logging.moderation.channel)

  if(logging.moderation.toggle == "true"){
    if(channel){
    if(message.channel.id !== logging.moderation.ignore_channel){
      if(!message.member.roles.cache.find(r => r.name.toLowerCase() === role.name)) {

if(logging.moderation.mute == "true"){
  
let color = logging.moderation.color;
if(color == "#000000") color = message.client.color.green;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

const logEmbedm = new MessageEmbed()
.setAuthor(`Action: \`Un Mute\` | ${mentionedMember.user.tag} | Case #${logcase}`, mentionedMember.user.displayAvatarURL({ format: 'png' }))
.addField('User', mentionedMember, true)
.addField('Reason',  'Mute Duration Expired', true)
.setFooter(`ID: ${mentionedMember.id}`)
.setTimestamp()
.setColor(color)

channel.send(logEmbedm).catch(()=>{})

logging.moderation.caseN = logcase + 1
await logging.save().catch(()=>{})
}
      }
    }
    }
  }
}

        }, ms(msRegex.exec(args[1])[1]))
    }
};
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
