const discord = require("discord.js")
const ticketSchema = require("../../models/tickets.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "tadd",
      aliases: ["ticketadd"],
      description: "Add a member to the current ticket",
      usage: "<user>",
      category: "Tickets"
    })
  }
  
  async run (message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    const language = require(`../../data/language/${guildDB.language}.json`)
    
    let userToMention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!userToMention) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.addNotSpecifyUser))
    
    await ticketSchema.findOne({
      guildID: message.guild.id
    }, async (err, db) => {
      if(!db) return
      
      try {
       let ticketRole = message.guild.roles.cache.get(db.supportRoleID);
       let ticketCategory = message.guild.channels.cache.get(db.categoryID);
       let ticketLog = message.guild.channels.cache.get(db.ticketModlogID);
       
       if(!message.member.roles.cache.has(ticketRole.id)) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.claimNotHaveRole.replace("{roleName}", ticketRole.name)))

       if(!message.channel.name.startsWith("ticket-")) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.addNotValidChannel))
       
       let pogy = message.guild.me
       let everyone = message.guild.roles.everyone;
       let author = message.author

    message.channel.updateOverwrite(pogy, { VIEW_CHANNEL: true, READ_MESSAGES: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, ATTACH_FILES: true });

    message.channel.updateOverwrite(everyone, { VIEW_CHANNEL: false });
      
    message.channel.updateOverwrite(author, { VIEW_CHANNEL: true, READ_MESSAGES: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, ATTACH_FILES: true });
    
    message.channel.updateOverwrite(userToMention.id, { VIEW_CHANNEL: true, READ_MESSAGES: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, ATTACH_FILES: true });

    if(ticketRole) {
    message.channel.updateOverwrite(ticketRole, { VIEW_CHANNEL: true, READ_MESSAGES: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, ATTACH_FILES: true });
    }
    
    message.react(client.emoji.check)


      
      } catch (e) {
        message.channel.send(`An error has occured: ${e}\nSend this in the support server.`)

      }
    })
  }
}