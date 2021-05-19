const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
const { MessageAttachment } = require("discord.js")
const Canvacord = require("canvacord/src/Canvacord")

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'slap',
        description: 'slap a user!',
        category: 'Images',
        cooldown: 4
      });
    }

    async run(message, args) {
   
  const client = message.client
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
          });
        
          const language = require(`../../data/language/${guildDB.language}.json`)
          
         try {
            const recipient = message.content.split(/\s+/g).slice(1).join(' '); 
           if (!recipient) {
                const member =  message.guild.me
                const mentionedMemberAvatar = member.user.displayAvatarURL({dynamic: false, format: "png"})
                const messageAuthorAvatar = message.author.displayAvatarURL({dynamic: false, format: "png"})
        
                let image = await Canvacord.slap(mentionedMemberAvatar, messageAuthorAvatar)
        
                let slap = new MessageAttachment(image, "slap.png")
        
                message.channel.send(slap)
        
                }
                else if (message.mentions.users.first() == message.author) {
                    
        
                const member =  this.client.user
                const mentionedMemberAvatar = member.user.displayAvatarURL({dynamic: false, format: "png"})
                const messageAuthorAvatar = message.author.displayAvatarURL({dynamic: false, format: "png"})
        
                let image = await Canvacord.slap(mentionedMemberAvatar, messageAuthorAvatar)
        
                let slap = new MessageAttachment(image, "slap.png")
        
                message.channel.send(slap)
                }
        
                else {
                let member = message.mentions.members.last();
 
     
     if(!member) {

      try {

       member = await message.guild.members.fetch(args[0])

     } catch {

member = message.member;

     }
        
        

       }
                const mentionedMemberAvatar = member.displayAvatarURL({dynamic: false, format: "png"})
                const messageAuthorAvatar = message.author.displayAvatarURL({dynamic: false, format: "png"})
        
                let image = await Canvacord.slap(messageAuthorAvatar, mentionedMemberAvatar)
        
                let slap = new MessageAttachment(image, "slap.png")
        
                message.channel.send(slap)
                
            }
            
                } catch (err) {
           message.channel.send(new discord.MessageEmbed().setColor(client.color.blue).setDescription(language.slapError))
              };



    }
};
