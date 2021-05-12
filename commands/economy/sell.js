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
      name: "sell",
      aliases: [],
      usage: "<itemName>",
      disabled: true,
      category: "Economy",
      examples: ["sell <itemName>"],
      description: "You can sell items here such as the animals you got for hunting",
    })
  }
  async run(message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const errorEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.red).setFooter("https://pogy.xyz").setTimestamp()
    const successEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.green).setFooter("https://pogy.xyz").setTimestamp()
    
    if(!args[0]) return message.channel.send(errorEmbed.setDescription("No args"))
    let itemToBuy = args[0].toLowerCase()
    
    const validItem = !!items.find((val) => val.item.toLowerCase().includes(itemToBuy))
    if(!validItem) return message.channel.send(errorEmbed.setDescription("Not valid item"))
    
    const itemPrice = items.find((val) => val.item.toLowerCase().includes(itemToBuy)).sell
    const sellable = items.find((val) => val.item.toLowerCase().includes(itemToBuy)).sellable
    if(sellable === false) return message.channel.send(errorEmbed.setDescription("You cant sell this item"))

    let params = { user: message.author.id }

    const userBalance = await bal.findOne(params)
    if(!userBalance) {
      new bal({
        user: message.author.id,
        balance: 0
      }).save().catch(err => console.log(err))
      return message.channel.send(errorEmbed.setDescription("Not have item"))
    }

    await inventory.findOne(params, async (err, data) => {
      if(data) {
        const hasItem = Object.keys(data.Inventory).includes(itemToBuy)
        if(!hasItem) {
          message.channel.send(successEmbed.setDescription(`No have ${items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item}`))
        } else {
          if(data.Inventory[items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item] === 0) return message.channel.send(errorEmbed.setDescription("You dont have this item"))
          data.Inventory[items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item]--
        }
        
        await inventory.findOneAndUpdate(params, data)
        await userBalance.updateOne({balance: Number(userBalance.balance) + Number(itemPrice)})
        message.channel.send(successEmbed.setDescription(`Sold ${items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item}`))
      } else {
        message.channel.send(successEmbed.setDescription(`No have ${items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item}`))
      }
    })
  }
}