const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const app = require("../../models/application/application.js");

const bal = require("../../models/economy/balance.js")
const inventory = require("../../models/economy/items.js")
const items = require("../../data/economy/shopItems.js")
const equippedGun = require("../../models/economy/equipped.js")

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "equip",
      aliases: [],
      usage: "<itemName>",
      disabled: true,
      category: "Economy",
      examples: ["equip <itemName>"],
      description: "You now will be able to equip items such as ammo and shotguns",
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
    let itemToEquip = args[0].toLowerCase()
    
    let equippedItem = !!items.find((val) => val.item.toLowerCase().includes(itemToEquip))
    if(!equippedItem) return message.channel.send(errorEmbed.setDescription("Not valid item"))
    let gunItem = items.find((val) => val.item.toLowerCase().includes(itemToEquip))
    
    let inv = await inventory.findOne({ user: message.author.id })
    
    let equipped = await equippedGun.findOne({ user: message.author.id })
    
    if(!inv) {
      new inventory({
        user: message.author.id,
        Inventory: {
          ["Default Shotgun"]: 1
        }
      }).save().catch(err => { message.channel.send(errorEmbed.setDescription("I have encountered an error -> " + err))})
      return message.channel.send(errorEmbed.setDescription("No have this item"))
    }
    
    if(inv) {
      const hasItem = Object.keys(inv.Inventory).includes(items.find((val) => val.item.toLowerCase().includes(itemToEquip)).item)
      if(!hasItem) {
        return message.channel.send(errorEmbed.setDescription("No have this item"))
      }
      
      if(hasItem) {
        if(!equipped) {
          new equippedGun({
            user: message.author.id,
            itemEquipped: gunItem.item
          }).save().catch(err => { message.channel.send(errorEmbed.setDescription("I have encountered an error -> " + err))})
          return message.channel.send(successEmbed.setDescription("Successfully equipped " + gunItem.item))
        }
        if(equipped) {
          await equipped.updateOne({
            itemEquipped: gunItem.item
          })
          return message.channel.send(successEmbed.setDescription("Successfully equipped " + gunItem.item))

        }
      }
    }
  }
}