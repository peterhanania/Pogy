const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const alt = require("../../models/altdetector.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "atoggle",
      aliases: [],
      usage: "<true | false>",
      category: "Alt Detector",
      examples: ["atoggle true"],
      description: "Disable or Enable the altdetector Module.",
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

      
      let choices = ["true", "false"]
      if(!args[0] || !choices.includes(args[0].toLowerCase())) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.aactionNotValidChoice.replace("{allChoices}", choices.join(", "))))
      
      await alt.findOne({ guildID: message.guild.id }, async (err, db) => {
        if(!db){
            let newGuild = new alt({
            guildID: message.guild.id,
            altDays: 7 /*86400000*/,
            altModlog: '',
            allowedAlts: [],
            altAction: 'none',
            altToggle: args[0].toLowerCase(),
            notifier: false,
            })
            
            await newGuild.save()
            
            return message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.atoggleSuccess.replace("{choice}", args[0])))
        }
        
        await db.updateOne({
          altToggle: args[0].toLowerCase()
        })
        
              let choice 
      if(args[0].toLowerCase() === "true"){ 
        choice = "on" 
      }
      else if(args[0].toLowerCase() === "false") { 
        choice = "off" 
      }
        
        return message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.atoggleSuccess.replace("{toggle}", choice)))

      })
   }
}