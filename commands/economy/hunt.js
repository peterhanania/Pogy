const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const app = require("../../models/application/application.js");

const bal = require("../../models/economy/balance.js")
const rifle = require("../../models/economy/items.js")
const animals = require("../../models/economy/animals.js")
const items = require("../../data/economy/shopItems.js")
const equippedGun = require("../../models/economy/equipped.js")

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "hunt",
      aliases: [],
      usage: "",
      disabled: true,
      category: "Economy",
      examples: ["hunt"],
      description: "Hunt for animals, the better rifle you have the better animals you can catch",
    })
  }
  async run(message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const errorEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.red).setFooter({text: "https://pogy.xyz"}).setTimestamp()
    const successEmbed = new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'})).setColor(client.color.green).setFooter({text: "https://pogy.xyz"}).setTimestamp()

  }
}