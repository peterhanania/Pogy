const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const app = require("../../models/application/application.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "addquestion",
      aliases: ["addquestions", "applicationquestions", "appquestions"],
      usage: "<question>",
      category: "Applications",
      examples: ["addquestion Question1 | Question2"],
      description: "Add questions to the list and when you apply they will be there",
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
    

    let questions = args.slice(0).join(" ")

  
  let maxQuestions = 10
  if(guildDB.isPremium === true) {
    maxQuestions = 25
  }
    if(!questions) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.addquestionMissingArg))
  let split = questions.split("|")
  
  await app.findOne({
    guildID: message.guild.id
  }, async (err, db) => {

  
  let arr = []
  
  if(!db) {
    let actualArr = arr.concat(split)
    console.log(actualArr)
    if(actualArr.length > maxQuestions) {
      return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.addquestionMoreThanLength.replace("{amountLength}", maxQuestions)))
    }
    let newAppDB = new app({
     guildID: message.guild.id,
     questions: actualArr,
     appToggle: false,
     appLogs: ' '
    })
    await newAppDB.save().catch((err) => {console.log(err)})
    
    return message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.addquestionSuccess))
  }
  
    let ar = await db.questions
    let actualArr = ar.concat(split)

    if(actualArr.length > maxQuestions) {
      return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.addquestionMoreThanLength.replace("{amountLength}", maxQuestions)))
    }
    await db.updateOne({
      questions: actualArr
    })
    
    return message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.addquestionSuccess))
})
  
  }
}