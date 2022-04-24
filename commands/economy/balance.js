const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const app = require("../../models/application/application.js");

const bal = require("../../models/economy/balance.js")
const inventory = require("../../models/economy/items.js")
const items = require("../../data/economy/shopItems.js")
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "balance",
      aliases: ["bal"],
      usage: "(user)",
      disabled: true,
      category: "Economy",
      examples: ["balance W-Legit"],
      description: "You can check your balance or someone else's balance",
    })
  }
  async run(message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const errorEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.red).setFooter({text: "https://pogy.xyz"}).setTimestamp()
    const successEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.green).setFooter({text: "https://pogy.xyz"}).setTimestamp()

    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

    let amountOfMoney


    await bal.findOne({ user: user.user.id }, async (err, db) => {
      if(!db) {
        new bal({
          user: user.id,
          balance: 0
        })
        .save()
        .catch(err => { return message.channel.send(`I have encountered an error -> ${err}`)})
        amountOfMoney = 0
      } else {
        amountOfMoney = db.balance
      }

      message.channel.send(successEmbed.setTitle(`${user.user.username}'s Balance`).setDescription(`-> ${amountOfMoney} <:coin:822159088221814836>`)
)
    })
  }
}