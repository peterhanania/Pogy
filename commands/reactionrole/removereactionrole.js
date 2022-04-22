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
        name: 'removerr',
        aliases: ["removereactionrole", "rreactionrole", "deletereactionrole", "delreactionrole", "remrr", "delrr", 'delreaction', 'deletereaction'],
        description: 'Create a reaction role',
        category: 'Reaction Role',
        cooldown: 3,
        usage: '<channel> <messageID> <emoji>',
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
  const missingPermEmbed = new MessageEmbed()
  .setAuthor(`Missing User Permissions`, message.author.displayAvatarURL())
  .setDescription(`${fail} The following command the **Administrator** Permission`)
  .setFooter({text: 'https://pogy.xyz/'})
   .setColor(client.color.red)

      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(ch => ch.name === args[0])
    if (!channel) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Channel`)
  .setFooter({text: 'https://pogy.xyz/'})
   .setColor(client.color.red)
    );
    
    let ID = args[1]
    if(!ID) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid message ID`)
  .setFooter({text: 'https://pogy.xyz/'})
    );
    let messageID = await channel.messages.fetch(ID).catch(() => { return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} I could not find the following ID`)
  .setFooter({text: 'https://pogy.xyz/'})
   .setColor(client.color.red)
    ); })

           let emoji = args[2]

    if (!emoji) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Emoji`)
  .setFooter({text: 'https://pogy.xyz/'})
   .setColor(client.color.red)
    );

  
    
    if (isCustomEmoji(args[2])) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Do Not use custom Emojis!`)
  .setFooter({text: 'https://pogy.xyz/'})
   .setColor(client.color.red)
    );
    
   

    await react.reactionDelete(client, message.guild.id , ID, emoji);
    
     message.channel.send(new MessageEmbed()
   .setColor(client.color.green)
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Deleted The [Reaction Role](${messageID.url})`)
  .setFooter({text: 'https://pogy.xyz/'}))
  


        function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }
    
    }
};