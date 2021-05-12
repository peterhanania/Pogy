const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const alt = require("../../models/altdetector.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "amodlog",
      aliases: [],
      usage: "<channel>",
      category: "Alt Detector",
      examples: ["amodlog logchannel"],
      description: "Set the channel in which logs will be sent.",
      cooldown: 5,
      userPermission: ['MANAGE_GUILD'],
    })
  }
  async run(message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const language = require(`../../data/language/${guildDB.language}.json`)
    

  
  
  let channel = message.mentions.channels.first() || message.guild.channels.cache.find(ch => ch.name === args[0]) || message.guild.channels.cache.get(args[0])
  if(!channel) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.amodlogNotValidChannel))
  
  await alt.findOne({ guildID: message.guild.id }, async (err, db) => {
      if(!db) {
            let newGuild = new alt({
            guildID: message.guild.id,
            altDays: 7,
            altModlog: channel.id,
            allowedAlts: [],
            altAction: 'none',
            altToggle: false,
            notifier: false,
            })
            
            await newGuild.save()
            
            return message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.amodlogSuccess.replace("{modLog}", "#" + channel.name)))
      }
      
      await db.updateOne({
        altModlog: channel.id
      })
      
    return message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.amodlogSuccess.replace("{modLog}", "#" + channel.name)))
      
  })
  }
}