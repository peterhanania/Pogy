const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const app = require("../../models/application/application.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "questions",
      aliases: ["question"],
      category: "Applications",
      examples: ["question"],
      description: "Displays all the form questions in the server",
      cooldown: 5,
    })
  }
  async run(message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const language = require(`../../data/language/${guildDB.language}.json`)
    
      await app.findOne({
    guildID: message.guild.id
  }, async (err, db) => {
    if(!db) {
    let newAppDB = new app({
     guildID: message.guild.id,
     questions: [],
     appToggle: false,
     appLogs: ' '
    })
    
    await newAppDB.save().catch((err) => {console.log(err)})
    return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.questionNoQuest)) //No questions
    }
    
    if(db.questions.length === 0 || db.questions.length < 1) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.questionNoQuest)) //No questions
    
    let text = ""
    let arrLength = db.questions.length
    let arr = db.questions
    for(let i = 0; i < arrLength; i++) {
      text += `\`${Number([i]) + 1}\` - ${arr[i]}\n`
    }
    message.channel.send(new discord.MessageEmbed().setColor(client.color.green).addField("**" + language.questionTitle + "**", text))
  })
  }
}