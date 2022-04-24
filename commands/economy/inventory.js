const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const app = require("../../models/application/application.js");

const bal = require("../../models/economy/balance.js")
const inventory = require("../../models/economy/animals.js")
const items = require("../../data/economy/items.js")
const shop = require("../../data/economy/shopItems.js")
const equippedGun = require("../../models/economy/equipped.js")
//equipped
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "inventory",
      aliases: [ "profile"],
      usage: "",
      disabled: true,
      category: "Economy",
      examples: ["inventory"],
      description: "Check everything you have baught from the shop here",
    })
  }
  async run(message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const errorEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.red).setFooter({text: "https://pogy.xyz"}).setTimestamp()
    const successEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.green).setFooter({text: "https://pogy.xyz"}).setTimestamp()
    
      

    await inventory.findOne({ user: message.author.id }, async (err, data) => {
      let inv;
      let str;
      if(!data) {
        inv = "You do not own any animals"
      }
      if(data) {
      inv = Object.keys(data.Inventory).map((key) => {
      if(data.Inventory[key] === 0) {
       str = ""
       if(str.length === 0) {
         str = ""
         //str = `You do not have any **${key}**`
       }
      } else {
       str = `**${key}** ─ ${data.Inventory[key]}`
      }

        return str
      }).join("\n")
      }
      
      let equippe = await equippedGun.findOne({ user: message.author.id })
      let equip

      if(!equippe) { 
        equip = "Default Shotgun"
      } else {
        equip = equippe.itemEquipped
      }
      let i = shop.find((val) => val.item.toLowerCase().includes(equip.toLowerCase()))
      if(!data || data.Inventory === null || data === null || data === undefined) {
      inv = "You do not own any animals"
      }
      
      if(inv.length === 1 || inv.length === 0) {
        inv = "You do not own any animals"
      }

      message.channel.send(successEmbed.setTitle("Your Profile").setDescription(`You have hunted **{TimeYouHunted}** times`).addField("**Inventory**", `${inv} `, true).addField("**Stats**", `You have found **{TotalAnimals}** animals\nGun Equipped: **${i.emoji} ─ ${i.item}**`, true))
      
      })
    }
}