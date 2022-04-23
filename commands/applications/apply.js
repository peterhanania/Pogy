const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const app = require("../../models/application/application.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "apply",
      aliases: [],
      usage: "",
      category: "Applications",
      examples: ["apply"],
      description: "Apply in the current servers, or answer a few questions",
      cooldown: 5,

    })
  }
  
  async run(message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const language = require(`../../data/language/${guildDB.language}.json`)
    const closed = new discord.MessageEmbed()
    .setDescription(`${message.client.emoji.fail} | ${language.closedapplay1} `)
    .setColor(message.client.color.red)

        const closed2 = new discord.MessageEmbed()
    .setDescription(`${message.client.emoji.fail} | ${language.closedapplay2}.`)
    .setColor(message.client.color.red)


   let db = await app.findOne({
      guildID: message.guild.id
    })
    
      if(!db) {
      let newAppDB = new app({
       guildID: message.guild.id,
       questions: [],
       appToggle: false,
       appLogs: null
      })
    await newAppDB.save().catch((err) => {console.log(err)})
    
    return message.channel.send(closed)
  }
  

  if(db.questions.length === 0 || db.questions.length < 1) return message.channel.send(closed) ;
  const channel = await message.guild.channels.cache.get(db.appLogs);
  if(!channel) return message.channel.send(closed);
      await message.author.send(new discord.MessageEmbed().setColor(message.client.color.green).setFooter({text: 'Powered by Pogy.xyz'}).setDescription(`${message.client.emoji.success} | ${language.applaydone} **${message.guild.name}** [by clicking here](https://pogy.xyz/apply/${message.guild.id})`))
      .then(message.channel.send(`Form sent by DMs - ${message.author}`))
      .catch(()=>{
        return message.channel.send(closed2)
        })

      
     
    }
  }
