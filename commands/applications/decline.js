const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const App = require("../../models/application/application.js");
const Paste = require("../../models/transcript.js")
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "declineapp",
      aliases: ["declineapplication", "declineappliction", "declineform"],
      usage: "<user> <app ID> <reason>",
      category: "Applications",
      examples: ["decline @peter OERKSOAE underage"],
      description: "Decline an application in the guild.",
      cooldown: 5,
      userPermission: ['MANAGE_GUILD'],
      botPermission: ['MANAGE_ROLES']
    })
  }
 async run(message, args) {
   
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const language = require(`../../data/language/${guildDB.language}.json`)
        if(guildDB.isPremium === "false"){

message.channel.send(new discord.MessageEmbed().setColor(message.guild.me.displayHexColor).setDescription(`${message.client.emoji.fail} Slow down here, the current command is only for premium guilds.\n\n[Check Premium Here](https://pogy.xyz/premium)`))

      return;
    }
       let member = message.mentions.members.first();
     
     if(!member) {

      try {

       member = await message.guild.members.fetch(args[0])

     } catch {

return message.channel.send(`${client.emoji.fail} Provide me with a valid member in the guild`)

     }
        
        

       }
        
           let app = await App.findOne({
      guildID: message.guild.id
    });

    if(!app){
app = new App({
      guildID: message.guild.id
    });

    await app.save()
     app = await App.findOne({
      guildID: message.guild.id
    });
    }

        if(!member) return message.channel.send(`${client.emoji.fail} Provide me with a valid member in the guild`)

        const id = args[1]
       const paste =  await Paste.findOne({
          type: "form",
          by: member.id,
          _id: args[1]
        })
       
       if(!paste)  return message.channel.send(`${client.emoji.fail} Could not find this application.`)


       let reason = args.slice(2).join(' ');
if (!reason) reason = `${language.noReasonProvided}`;
if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

if(paste.status === "approved") return message.channel.send(`${client.emoji.fail} | This application was already approved`)
if(paste.status === "declined") return message.channel.send(`${client.emoji.fail} | This application was already declined`)

paste.status = "declined",
await paste.save().catch(()=>{});

const rem_role = message.guild.roles.cache.get(app.remove_role)
if(rem_role){
  await member.roles.remove(rem_role).catch(()=>{})
}
message.channel.send(new discord.MessageEmbed().setColor(message.client.color.green).setTitle(`Application Declined!`).setDescription(`${client.emoji.success} I have sucessfully declined this application.\n\n**Application ID:** ${id}\n**Declined by:** ${message.author.tag}\n**Reason:** ${reason}`))

if(app.dm === true){
member.send(new discord.MessageEmbed().setColor(message.client.color.red).setTitle(`Application Declined`).setDescription(`${client.emoji.fail} Hey ${member.user.tag}, your application was Declined.\n\n**Application ID:** ${id}\n**Declined by:** ${message.author.tag}\n**Reason:** ${reason}`)).catch(()=>{
  message.channel.send(`Never Mind... I was able to decline the application but couldn't dm ${member.user.tag} since their DMs are closed.'`)

})
}

 
  }
}