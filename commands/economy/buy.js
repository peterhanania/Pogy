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
      name: "buy",
      aliases: ["purchase"],
      usage: "<itemName>",
      category: "Economy",
      disabled: true,
      examples: ["buy <itemName>"],
      description: "You can buy items here such as hunting rifles and ammo",
    })
  }
  async run(message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const errorEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.red).setFooter({text: "https://pogy.xyz"}).setTimestamp()
    const successEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.green).setFooter({text: "https://pogy.xyz"}).setTimestamp()
    
    if(!args[0]) return message.channel.send(errorEmbed.setDescription("No args"))
    let itemToBuy = args[0].toLowerCase()
    
    const validItem = !!items.find((val) => val.item.toLowerCase().includes(itemToBuy))
    if(!validItem) return message.channel.send(errorEmbed.setDescription("Not valid item"))
    
    const itemPrice = items.find((val) => val.item.toLowerCase().includes(itemToBuy)).price
    const buyable = items.find((val) => val.item.toLowerCase().includes(itemToBuy)).buyable
  
    if(buyable === false) return message.channel.send(errorEmbed.setDescription("You cant buy this item"))
    let params = { user: message.author.id }

    const userBalance = await bal.findOne(params)
    if(!userBalance) {
      new bal({
        user: message.author.id,
        balance: 0
      }).save().catch(err => console.log(err))
      return message.channel.send(errorEmbed.setDescription("Not enough money1"))
    }
    if(userBalance < itemPrice) return message.channel.send(errorEmbed.setDescription("Not enough money1"))
    
    await inventory.findOne(params, async (err, data) => {
      if(data) {
        const hasItem = Object.keys(data.Inventory).includes(items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item)
        if(!hasItem) {
          data.Inventory[items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item] = 1
        } else {
          return message.channel.send(errorEmbed.setDescription("You already own this item"))
          //data.Inventory[items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item]++
        }
        
        await inventory.findOneAndUpdate(params, data)
        await userBalance.updateOne({balance: userBalance.balance - itemPrice})
        message.channel.send(successEmbed.setDescription(`Bought ${items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item}`))
      } else {
        new inventory({
          user: message.author.id,
          Inventory: {
            [items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item]: 1
          }
        }).save()
        .catch(err => console.log(err))
        await userBalance.updateOne({balance: userBalance.balance - itemPrice})
        message.channel.send(successEmbed.setDescription(`Bought ${items.find((val) => val.item.toLowerCase().includes(itemToBuy)).item}`))
      }
    })
  }
}