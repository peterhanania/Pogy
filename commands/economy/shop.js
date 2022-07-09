const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const app = require("../../models/application/application.js");

const bal = require("../../models/economy/balance.js")
const inventory = require("../../models/economy/items.js")
const gun = require("../../data/economy/shopItems.js")


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "shop",
      aliases: ["store"],
      usage: "",
      disabled: true,
      category: "Economy",
      examples: ["shop"],
      description: "You can check everything that is for sale",
    })
  }
  async run(message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const errorEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.red).setFooter({text: "https://pogy.xyz"}).setTimestamp()
    const successEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.green).setFooter({text: "https://pogy.xyz"}).setTimestamp()
    
    if(!args[0]) {
      return message.channel.send(errorEmbed.setDescription("Select category: gun"))
    }
    
    let itemToBuy = args.slice(0).join(" ").toLowerCase()

    let validCategory = !!gun.find((val) => val.category.includes(itemToBuy.toLowerCase()))
    if(validCategory) {
      let emoji;
      let nothing;
      await inventory.findOne({ user: message.author.id }, async(err, data) => {
       if(gun.find((val) => val.item.toLowerCase().includes(itemToBuy.toLowerCase())).category.includes(itemToBuy)) {
      const gunList = gun.map((val) => {
      let value = gun.find((v) => v.item.toLowerCase().includes(val.item.toLowerCase()))
      let str = `${emoji} | **${value.emoji} ${value.item}** ─ ${numberWithCommas(value.price)} <:coin:822159088221814836>\n${value.description}`
      if(value.buyable === false) {
        str = ""
      }
      if(!data) {
        emoji = "<:wrong:822376943763980348>"
        console.log("NO data ")
        return str
      }

      if(data) {
      let emoji;
        console.log(data.Inventory[value.item])
      if(data.Inventory[value.item] === undefined || !data.Inventory[value.item]) {
      emoji = "<:wrong:822376943763980348>"
      }

      if(data.Inventory[value.item] == '1' || data.Inventory[value.item] == Number(1)) {
      emoji = "<:correct:822376950659022858>"
      }
      let str = `${emoji} | **${value.emoji} ${value.item}** ─ ${numberWithCommas(value.price)} <:coin:822159088221814836>\n${value.description}`
      if(value.buyable === false) {
        str = ""
      }
      console.log(data.Inventory)
      return str
      }
    }).join("")

    return message.channel.send(successEmbed.setTitle("**Gun Shop**").setDescription(gunList))
    }
    })
    return
    }
    
    const validItem = !!gun.find((val) => val.item.toLowerCase().includes(itemToBuy.toLowerCase()))
    if(!validItem) return message.channel.send(errorEmbed.setDescription("Not valid item"))
    
    if(gun.length === 0) return message.channel.send(errorEmbed.setDescription("Shop is empty"))

    if(validItem) {
    const i = gun.find((val) => val.item.toLowerCase().includes(itemToBuy.toLowerCase()))
    await inventory.findOne({ user: message.author.id }, async (err, data) => {
      let amountOfItems
      console.log(data.Inventory[i.item])
      if(!data) {
        amountOfItems = "0"
      } else {
        amountOfItems = data.Inventory[i.item]
        if(amountOfItems === undefined) amountOfItems = "0" 
      }

      let iItem = i.item
      const iPrice = i.price
      let iDescription = i.description.slice(0, -1)
      let iSell = i.sell
      let iBuyable = i.buyable
      let iSellable = i.sellable
      let iDamage = i.damage
        let price
        let sell
        if(iBuyable === false) {
          price = "**Not able to be purchased**"
        } else {
          price = numberWithCommas(iPrice) + " <:coin:822159088221814836>"
        }
        if(iSellable === false) {
          sell = "**Not able to be sold**"
        } else {
          sell = numberWithCommas(iSell) + " <:coin:822159088221814836>"
        }
        message.channel.send(successEmbed.setTitle(i.emoji+" **"+iItem+"**"+" "+`(${amountOfItems})`).setDescription(iDescription + `\n\nPrice - ${price}\nSell - ${sell}\nDamage - ${iDamage}`))
    })
    }
    function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  }
}