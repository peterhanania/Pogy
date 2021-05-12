const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("../../packages/reactionrole/index.js")
const react = new ReactionRole()
const config = require("../../config.json");
react.setURL(config.mongodb_url)

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'rrdm',
        aliases: ["reactionrolesdm", "rrdirectmessages"],
        description: 'Enable / Disable Reaction Role DMs',
        category: 'Reaction Role',
        cooldown: 3,
        usage: 'on / off',
        userPermission: ['MANAGE_GUILD'],
      });
    }

    async run(message, args) {
    let client = message.client

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      
    
      let fail = message.client.emoji.fail
      let success = message.client.emoji.success
      const prefix = guildDB.prefix;

      if(guildDB.isPremium == "false"){
      return message.channel.send(new MessageEmbed().setColor(message.guild.me.displayHexColor).setDescription(`${fail} Slow down here, the current command is only for premium guilds.\n\n[Check Premium Here](https://pogy.xyz/premium)`))}

  const missingPermEmbed = new MessageEmbed()
  .setAuthor(`Missing User Permissions`, message.author.displayAvatarURL())
  .setDescription(`${fail} The following command the **Administrator** Permission`)
  .setFooter(`https://pogy.xyz`)
   .setColor(client.color.red)

   let properUsage = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`__**Proper Usage**__\n\n\`1-\` ${prefix}rrdm on\n\`2-\` ${prefix}rrdm off`)
        .setFooter('https://pogy.xyz')

      if (args.length < 1) {
        return message.channel.send(properUsage);
      }

 
      if (args.includes('disable') || args.includes('off')) {
  
      await Guild.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {
 if(guild.reactionDM === false) return message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} DMs are already disabled`)
  .setFooter(`https://pogy.xyz`)
   .setColor(client.color.red)
 )
        guild.updateOne({
          reactionDM: false
        })
        .catch(err => console.error(err));

message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Reaction Role DMs have been disabled!`)
  .setFooter(`https://pogy.xyz`)
   .setColor(client.color.red)
 )
    })
      } else if (args.includes('enable') || args.includes('on')) {


     await Guild.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {

 if(guild.reactionDM === true) return message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} DMs are already enabled`)
  .setFooter(`https://pogy.xyz`)
   .setColor(client.color.red))
        guild.updateOne({
          reactionDM: true
        })
        .catch(err => console.error(err));

 
message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Reaction Role DMs have been enabled!`)
  .setFooter(`https://pogy.xyz`)
   .setColor(client.color.red)
 )

   })

    } else if(args[0]) {
     message.channel.send(properUsage) 
    } else {
 message.channel.send(properUsage) 

    }


    }
};