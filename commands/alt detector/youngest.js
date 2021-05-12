const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const alt = require("../../models/altdetector.js");
const moment = require('moment')
const ms = require("ms")
const ReactionMenu = require('../../data/ReactionMenu.js');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "youngest",
      aliases: ["young"],
      usage: "<date>",
      category: "Alt Detector",
      examples: ["youngest 30"],
      description: "Find all youngest alts with the provided join date (days)",
      cooldown: 10,
      userPermission: ['MANAGE_GUILD'],
    })
  }
   async run(message, args) {
     const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const language = require(`../../data/language/${guildDB.language}.json`)
    const client = message.client
 


      let days = args[0]
      if(!days) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${message.client.emoji.fail} | Please provide a valid Days Duration`))

      if(isNaN(days)) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${message.client.emoji.fail} | Please provide a valid Days Duration`))
   
    let day = Number(days)

    if(day > 100) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${message.client.emoji.fail} | You may only find alts of an account age of **100 days** or below`))

    let array = []

    message.guild.members.cache.forEach(async(user)=>{

    let math = day * 86400000

    let x = Date.now() - user.joinedAt;
    let created = Math.floor(x / 86400000);
      
    if(day > created) {

    array.push(`${user} (${user.user.tag} | ${user.id})\nJoined At: **${user.joinedAt}**`)
    }
   
    })

    const interval = 10;


    const embed = new discord.MessageEmbed()
    .setTitle(`Alt Detector - Join age < ${days} Days`)
    .setDescription(array.join("\n\n") || "No alts found")
    .setColor(message.client.color.green)

if (array.length <= interval) {
    
    const range = (array.length == 1) ? '[1]' : `[1 - ${array.length}]`;
      message.channel.send(embed
        .setTitle(`Alt Detector - Join age < ${days} Days`)
        .setDescription(array.join('\n\n'))
      );

    } else {

      embed
        .setTitle(`Alt Detector - Join age < ${days} Days`)
        .setFooter(message.author.tag,  
          message.author.displayAvatarURL({ dynamic: true })
        );

      new ReactionMenu(message.client, message.channel, message.member, embed, array, interval);
    }



   }


}


