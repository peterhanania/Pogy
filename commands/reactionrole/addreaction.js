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
        name: 'addreaction',
        aliases: ["reactionrole", "rr", "createrr","crr", "addrr", "arr", "rradd"],
        description: 'Create a reaction role',
        category: 'Reaction Role',
        cooldown: 3,
        usage: '<channel> <messageID> <role> <emoji> (option)',
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

    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(rl => rl.name === args[2])
    if (!role) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Role`)
  .setFooter({text: 'https://pogy.xyz/'})
   .setColor(client.color.red)
    );

    if(role.managed){
      return message.channel.send(`${message.client.emoji.fail} Please do not use a integration role.`)
    }
      
     let emoji = args[3]

    if (!emoji) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Emoji`)
  .setFooter({text: 'https://pogy.xyz/'})
   .setColor(client.color.red)
    );

    if (isCustomEmoji(args[3])) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Do Not use custom Emojis!`)
  .setFooter({text: 'https://pogy.xyz/'})
   .setColor(client.color.red)
    );

try {

await messageID.react(emoji)

} catch(err){
 return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Please Provide a valid Emoji.`)
  .setColor(client.color.red)
  .setFooter({text: 'https://pogy.xyz/'}));
}
 
    
    let option = args[4]
    if(!option) option = 1
    if(isNaN(option)) option = 1
    if(option > 6) option = 1
    
    
    await react.reactionCreate(client, message.guild.id , ID, role.id, emoji, "false", option);
    
                message.channel.send(new MessageEmbed()
                .setAuthor('Reaction Roles', message.guild.iconURL(),messageID.url)
                .setColor(client.color.green)
                .addField('Channel', channel, true)
                .addField('Emoji', emoji, true)
                .addField('Type', option, true)
                .addField('Message ID', ID, true)
                .addField('Message', `[Jump To Message](${messageID.url})`, true)
                .addField('Role', role, true)
                .setFooter({text: 'https://pogy.xyz/'}))

        function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }

    }
};