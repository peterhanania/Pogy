const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const discord = require("discord.js")
const ticketSchema = require("../../models/tickets.js")

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ticketsetup",
      aliases: ["tsetup", "t-setup", "ticket-setup"],
      description: "Setup a ticket system in your discord server with alot of option",
      category: "Tickets",
      cooldown: 3,
      botPermission: ["ADD_REACTIONS"]
    })
  }
  
  async run(message, args) {
    const client = message.client;

           const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupNoPerms))
    
    let filter = m => m.author.id === message.author.id;





    message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setDescription(language.ticketsetupToChooseFrom))
    .then(() => {
      message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
      .then(collected => {
        let choice = collected.first().content
        let toChooseFrom = ["reaction", "message"]


        if(choice.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${language.ticketPromptseggs}`)) 

        if(!toChooseFrom.includes(choice.toLowerCase())){

message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupInvalidChoice.replace("{toChooseFrom}", toChooseFrom.join(", "))))


return;

        }
        
        //Reaction ticket
        if(choice.toLowerCase() === "reaction") {
          message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(`${language.ticketsetupReaction}`).setDescription(language.ticketsetupReactionChannelID))
          .then(() => {
           message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
           .then(collected2 => {
             let channel = collected2.first().content
             let channelMention = collected2.first().mentions
             let channelToSend = channelMention.channels.first() || message.guild.channels.cache.get(channel) || message.guild.channels.cache.find(ch => ch.name === channel.toLowerCase())
             if (channel.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))
             if(!channelToSend) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionInvalidChannel)) 
             
             message.channel.send(new discord.MessageEmbed().setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomChoice).setColor(client.color.green))
             .then(() => {
              message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
              .then(collected3 => {
                let choice = collected3.first().content
                let choices = ["custom", "bot"]
                if(!choices.includes(choice.toLowerCase())) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupInvalidChoice.replace("{toChooseFrom}", toChooseFrom.join(", ")))) 
                
                //custom message from user
                if(choice.toLowerCase() === "custom") {
                  
                  message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomMessageID))
                  .then(() => {
                   message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
                   .then(async collected4 => {
                     
                    let ID = collected4.first().content
                    if (ID.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))

                    let messageID = await channelToSend.messages.fetch(ID).catch(() => { return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupReactionCustomInvalidMessageID));
                   })
                    
                    message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomCategory))
                    .then(() => {
                     message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
                     .then(collected5 => {
                       let categoryChannelName = collected5.first().content
                       let categoryChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes(categoryChannelName.toLowerCase())) || message.guild.channels.cache.get(categoryChannelName)

                        if (categoryChannelName.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))
                        
                       if(!categoryChannel) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupReactionCustomInvalidCategory)) 

                       if(categoryChannel.type !== "category") return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupReactionCustomNotCategory))
                       message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomRole))
                       .then(() => {
                        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
                        .then(collected6 => {
                          let roleName = collected6.first().content
                          let roleMention = collected6.first().mentions
                          let role = message.guild.roles.cache.get(roleName) || message.guild.roles.cache.find(rl => rl.name.toLowerCase().includes(roleName.toLowerCase())) || roleMention.roles.first()

                           if (roleName.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))

                          if(!role) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupReactionCustomInvalidRole)) 
                        message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomModLogs)).then(() => {
                             message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
                             .then(collected7 => {
                    let modlog = collected7.first().content
                    let modlogMention = collected7.first().mentions
                    let modlogChannel = modlogMention.channels.first() || message.guild.channels.cache.get(modlog) || message.guild.channels.cache.find(ch => ch.name === modlog.toLowerCase())
                     if (modlog.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))

             if(!modlogChannel) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionInvalidChannel)) 
             
             
             
             
             message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomSuccess.replace("{option}", choice.toLowerCase())))
                .then(async () => {
                  messageID.react("🎫");
                  await ticketSchema.findOne({
                    guildID: message.guild.id
                }, async (err, guild) => {
                  if(!guild){
                  const newGuild = await ticketSchema.create({
                    guildID: message.guild.id,
                    ticketReactChannel: channelToSend.id,
                    supportRoleID: role.id,
                    categoryID: categoryChannel.id,
                    ticketModlogID: modlogChannel.id,
                    ticketCustom: "true",
                    ticketType: "reaction",
                    ticketToggle: "true"
                    });
                    newGuild.messageID.push(ID)
                    newGuild.save()
                    return;
                  }
                  let newTicketSchema =  await ticketSchema.findOne({
                    guildID: message.guild.id
                })


const array = guild.messageID
array.push(ID)
                           await ticketSchema.updateOne({
                            guildID: message.guild.id,
                            ticketReactChannel: channelToSend.id,
                            messageID: array,
                            supportRoleID: role.id,
                            categoryID: categoryChannel.id,
                            ticketModlogID: modlogChannel.id,
                            ticketType: "reaction",
                            ticketCustom: "true",
                            ticketToggle: "true"
                            })
                
                });

                  })
                         }).catch(err => { 
         
                           message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded));

                       
                         })
                         
                        })
                       }).catch(err => {
                       
                       message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded)); })
                     })

                     }).catch(err => { message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded)); 

                     })
                    })
                   }).catch(err => { message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded)); 
                   })
                  }) 
                }
                
                //message from bot
              if(choice.toLowerCase() === "bot") {
                    
                    message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomCategory))
                    .then(() => {
                     message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
                     .then(collected5 => {
                       let categoryChannelName = collected5.first().content
                       let categoryChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes(categoryChannelName.toLowerCase())) || message.guild.channels.cache.get(categoryChannelName)

                        if (categoryChannelName.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))
                       if(!categoryChannel) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupReactionCustomInvalidCategory)) 
                       if(categoryChannel.type !== "category") return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupReactionCustomNotCategory))
                       message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomRole))
                       .then(() => {
                        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
                        .then(collected6 => {
                          let roleName = collected6.first().content
                          let roleMention = collected6.first().mentions
                          let role = message.guild.roles.cache.get(roleName) || message.guild.roles.cache.find(rl => rl.name.toLowerCase().includes(roleName.toLowerCase())) || roleMention.roles.first()

                           if (roleName.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))

                          if(!role) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupReactionCustomInvalidRole)) 
                        
                        message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomModLogs))
                        .then(() => {
                         message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
                          .then(collected7 => {
                    let modlog = collected7.first().content
                    let modlogMention = collected7.first().mentions
                    let modlogChannel = modlogMention.channels.first() || message.guild.channels.cache.get(modlog) || message.guild.channels.cache.find(ch => ch.name === modlog.toLowerCase())

                     if (modlog.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))

             if(!modlogChannel) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionInvalidChannel))
           
             message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomSuccess.replace("{option}", choice.toLowerCase())))
                .then(async () => {
                  let m = await channelToSend.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketTicketWord).setDescription(language.ticketHowToCreate).setFooter('https://pogy.xyz'))
                   m.react("🎫");

                   await ticketSchema.findOne({
                    guildID: message.guild.id
                }, async (err, guild) => {
                  if(!guild){
                  const newGuild = await ticketSchema.create({
                    guildID: message.guild.id,
                    ticketReactChannel: channelToSend.id,
                    supportRoleID: role.id,
                    categoryID: categoryChannel.id,
                    ticketModlogID: modlogChannel.id,
                    ticketType: "reaction",
                    ticketCustom: "false",
                    ticketToggle: "true"
                    });
                    newGuild.messageID.push(m.id);

                    newGuild.save()
                    return;
                  }
                  let newTicketSchema =  await ticketSchema.findOne({
                    guildID: message.guild.id
                })

          

const array = guild.messageID;
array.push(m.id)
                           await ticketSchema.updateOne({
                            guildID: message.guild.id,
                            ticketReactChannel: channelToSend.id,
                            messageID: array,
                            supportRoleID: role.id,
                            categoryID: categoryChannel.id,
                            ticketModlogID: modlogChannel.id,
                            ticketType: "reaction",
                            ticketCustom: "false",
                             ticketToggle: "true"
                            })
                
                });

                  })
                         }).catch(err => { message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded)); 
      })
                        })
                       }).catch(err => { message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded)); 
                      })
                     })

                     }).catch(err => { message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded)); 
          })
                    })
                }
                
              }).catch(err => { message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded)); 
        })
             })
           }).catch(err => { message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded))
          
})
          })
        }
        
        if(choice.toLowerCase() === "message") {
          //return message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupMessage).setDescription("Coming soon")).then(m => m.delete({timeout: 5000}))
          message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupMessage).setDescription(language.ticketsetupReactionCustomCategory))
                  .then(() => {
          message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
           .then(async collected5 => {
            let categoryChannelName = collected5.first().content
            let categoryChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes(categoryChannelName.toLowerCase())) || message.guild.channels.cache.get(categoryChannelName)
             if (categoryChannelName.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))

            if(!categoryChannel) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupReactionCustomInvalidCategory)) 
            if(categoryChannel.type !== "category") return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupReactionCustomNotCategory))
            message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupMessage).setDescription(language.ticketsetupReactionCustomRole))
            .then(() => {
              message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
              .then(collected6 => {
                let roleName = collected6.first().content
                let roleMention = collected6.first().mentions
                let role = message.guild.roles.cache.get(roleName) || message.guild.roles.cache.find(rl => rl.name.toLowerCase().includes(roleName.toLowerCase())) || roleMention.roles.first()
                 if (roleName.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))
                if(!role) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupReactionCustomInvalidRole))
                        
                message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupMessage).setDescription(language.ticketsetupReactionCustomModLogs))
                .then(() => {
                 message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"]})
                 .then(collected7 => {
                    let modlog = collected7.first().content
                    let modlogMention = collected7.first().mentions
                    let modlogChannel = modlogMention.channels.first() || message.guild.channels.cache.get(modlog) || message.guild.channels.cache.find(ch => ch.name === modlog.toLowerCase())

                     if (modlog.toLowerCase() === 'cancel') return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupReaction).setDescription(`${language.ticketPromptseggs}`))
             if(!modlogChannel) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setTitle(language.ticketsetupMessage).setDescription(language.ticketsetupReactionInvalidChannel)) 
             
             message.channel.send(new discord.MessageEmbed().setColor(client.color.green).setTitle(language.ticketsetupReaction).setDescription(language.ticketsetupReactionCustomSuccess.replace("{option}", choice.toLowerCase())))
             .then(async () => {
              await ticketSchema.findOne({
                    guildID: message.guild.id
                }, async (err, guild) => {
                  if(!guild){
                  const newGuild = await ticketSchema.create({
                    guildID: message.guild.id,
                    ticketReactChannel: null,
                    messageID: null,
                    supportRoleID: role.id,
                    categoryID: categoryChannel.id,
                    ticketModlogID: modlogChannel.id,
                    ticketType: "message"
                    });
                    newGuild.save()
                    return;
                  }
                  let newTicketSchema =  await ticketSchema.findOne({
                    guildID: message.guild.id
                })


                await ticketSchema.updateOne({
                    guildID: message.guild.id,
                    ticketReactChannel: null,
                    messageID: null,
                    supportRoleID: role.id,
                    categoryID: categoryChannel.id,
                    ticketModlogID: modlogChannel.id,
                    ticketType: "message",
                    ticketToggle: "true"
                  })
                });
             })
                 }).catch(err => {  message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded))
console.log(err)
                 })
              })
              }).catch(err => { message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded))})
            })
           }).catch(err => { message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded))})
          })
        }
      }).catch(err => { message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(language.ticketsetupTimeEnded))})
    })
  }
  
}