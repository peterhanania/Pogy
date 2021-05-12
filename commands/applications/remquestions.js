const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const app = require("../../models/application/application.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "remquestion",
      aliases: ["remquestions", "remquest", "remquests"],
      usage: "<number>",
      category: "Applications",
      examples: ["remquestion 1"],
      description: "Removes a question off the list.",
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
    

  let number = args[0]
  if(!number || isNaN(number) || number === "0") return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.remquestion))
  
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
    return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.remquestion))
    }
    
    let questions = db.questions
    let num = Number(number) - 1
    
    if(!questions[num]) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.remquestion))
    
    questions.splice(num, 1)
    
    await db.updateOne({
      questions: questions
    })
    
    return message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.remquestionSuccess))
  })
  }
}