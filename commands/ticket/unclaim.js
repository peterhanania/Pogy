const discord = require("discord.js")
const ticketSchema = require("../../models/tickets.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "unclaim",
      description: "Unclaim a ticket so another ticket support or staff claims it again",
      aliases: [],
      cooldown: 3,
      usage: ' ',
      category: 'Tickets'
    })
  }
  
  async run(message, args) {
    const client = message.client
    
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
            const language = require(`../../data/language/${guildDB.language}.json`)

      
      const ticketFetch = await ticketSchema.findOne({
        guildID: message.guild.id
      }, async (err, db) => {
        if(!db) return
        
      let ticketRole = message.guild.roles.cache.get(db.supportRoleID);
      let ticketCategory = message.guild.channels.cache.get(db.categoryID);
      let ticketLog = message.guild.channels.cache.get(db.ticketModlogID);
      
      if(!message.member.roles.cache.has(ticketRole.id)) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.unclaimNotHaveRole.replace("{roleName}", ticketRole.name)))
        
        if(!message.channel.name.startsWith("ticket-")) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.unclaimNotValidChannel))
        

        message.channel.updateOverwrite(message.author, {
          VIEW_CHANNEL: null
        }).catch(err => { message.channel.send(new discord.MessagEmbed().setColor(client.color.red).setDescription(language.unclaimDontHavePerms))})
        message.channel.updateOverwrite(ticketRole.id, {
          VIEW_CHANNEL: true
        }).catch(err => { message.channel.send(new discord.MessagEmbed().setColor(client.color.red).setDescription(language.unclaimDontHavePerms))})
        
        let pogy = message.guild.me;
        let everyone = message.guild.roles.everyone;
        
        message.channel.updateOverwrite(pogy, { VIEW_CHANNEL: true, READ_MESSAGES: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, ATTACH_FILES: true }).catch(err => { message.channel.send(new discord.MessagEmbed().setColor(client.color.red).setDescription(language.unclaimDontHavePerms))})
        message.channel.updateOverwrite(everyone, { VIEW_CHANNEL: false }).catch(err => { message.channel.send(new discord.MessagEmbed().setColor(client.color.red).setDescription(language.unclaimDontHavePerms))})
        
        message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.unclaimSuccess.replace("{userName}", message.author.username)))
      })
  }
}