const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const alt = require("../../models/altdetector.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "abypass",
      aliases: [],
      usage: "<userID>",
      category: "Alt Detector",
      examples: ["abypass 402490971041824768"],
      description: "Whitelist alt accounts of your choice.",
      cooldown: 5,
      userPermission: ['MANAGE_GUILD'],
    })
  }
  
  async run(message, args) {
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const language = require(`../../data/language/${guildDB.language}.json`)
      
    const client = message.client
    
      
      await client.users.fetch(args[0])
      .then(u => {

        alt.findOne({
          guildID: message.guild.id
        }, async (err, db) => {
                    

          
          if(!db) {
            let newGuild = new alt({
            guildID: message.guild.id,
            altDays: 7,
            altModlog: '',
            allowedAlts: [args[0]],
            altAction: 'none',
            altToggle: false,
            notifier: false,
            })
            
            await newGuild.save()
            .catch(err => { console.log( err ) })
        return message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.abypassSuccess.replace("{userID}", args[0])))

          }
          
          let oldAllowedAlts = db.allowedAlts //[]
          if(guildDB.isPremium === "false") {
          if(oldAllowedAlts.length === 10) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.abypassNotPremium10))
          }
          if(guildDB.isPremium === "true") {
          if(oldAllowedAlts.length === 50) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.abypassNotPremium10.replace("10", "50")))
          }
          oldAllowedAlts.push(u.id)
          
          await db.updateOne({
            allowedAlts: oldAllowedAlts
          })
          
          message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.abypassSuccess.replace("{userID}", args[0])))
        })
      })
      .catch(err => {
        message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.abypassNotValidUser))
      })
  }
}