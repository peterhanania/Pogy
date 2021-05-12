const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const alt = require("../../models/altdetector.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "adisallow",
      aliases: [],
      usage: "<userID>",
      category: "Alt Detector",
      examples: ["adisallow 402490971041824768"],
      description: "Remove an alt account off the whitelist.",
      cooldown: 5,
      userPermission: ['MANAGE_GUILD'],
    })
  }
   async run(message, args) {
     const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const language = require(`../../data/language/${guildDB.language}.json`)
     const client = message.client
 
    
    await alt.findOne({ guildID: message.guild.id }, async(err, db) => {
      if(!db) {
            let newGuild = new alt({
            guildID: message.guild.id,
            altDays: 7 ,
            altModlog: '',
            allowedAlts: [],
            altAction: 'none',
            altToggle: false,
            notifier: false,
            })
            
            await newGuild.save()
            
            return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.adisallowNotInArray))
      }
      if(!args[0]) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.adisallowNotInArray))

      if(!db.allowedAlts.includes(args[0])) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.adisallowNotInArray))
      
      let arr = db.allowedAlts
      let newArr = removeA(arr, args[0])
      
      await db.updateOne({
        allowedAlts: newArr
      })
      
      message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.adisallowSucess))

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
    })
  }
      
}