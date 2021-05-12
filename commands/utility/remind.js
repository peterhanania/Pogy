const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/schemas/Guild');
const Discord = require('discord.js');
const ms = require('ms');
const mss = require("parse-ms")
let reminderstarted = new Set();
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'remind',
        description: 'Get reminded to do something!',
        category: 'Utility',
        cooldown: 3
      });
    }

    async run(message, args) {

 const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)

if (reminderstarted.has(message.author.id)) return message.channel.send(`${language.remind1}`);

  message.channel.send(`${language.remind2}`).catch(() => {});

  message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 30000}).then(collected => {
                                  


                                    if (collected.first().content.toLowerCase() == 'start') {
         reminderstarted.add(message.author.id);

         message.channel.send(`${language.remind3}`).catch(() => {});

           message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 30000}).then(collected => {
                                  
                                    if (collected.first().content.length < 1024) {
              let reminder = collected.first().content                              
message.channel.send(`${language.remind4} **[s/m/h/d]**`)
  message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 30000}).then(collected => {
                let valid = collected.first().content;
                let time = ms(valid);

if (!isNaN(ms(collected.first().content))) {
if(time > 86400000 ) {
  message.channel.send(`${message.client.emoji.fail} Please provide a date less than **1 day**`)
   reminderstarted.delete(message.author.id);
  return;
} 

                              let reminderTime = valid              
message.channel.send(`${language.remind5}`).catch(() => {});

  message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 30000}).then(collected => {
                                   

                                    if (collected.first().content.toLowerCase() == 'yes') {

let remindEmbed = new Discord.MessageEmbed() 
        .setColor('0x43f033')
        .setAuthor(`${language.remind6}`)
        .setDescription(`${language.remind7.replace("${reminder}", `${reminder}`).replace("${reminderTime}", `${reminderTime}`)}`) 
        .setTimestamp();
    message.channel.send(remindEmbed).catch(() => {}); 

    let guild = message.guild
    setTimeout(function() {
        let remindEmbed = new Discord.MessageEmbed()
            .setColor('#00e9ff')
            
            .setAuthor(`${language.remind8}`)
            .setDescription(`${language.remind9}`)
      .addField(`${language.remind10}`, guild, true )
      .addField(`${language.remind11}`, reminderTime, true)
       .addField(`${language.remind12}`, `"${reminder}"`, true)
            .setTimestamp()
 reminderstarted.delete(message.author.id);
            message.author.send(remindEmbed).catch(() => {

            message.channel.send(`${message.author}, ${language.remind13}`)
            }).catch(() => {});
          
    }, ms(reminderTime));
                                           
      
      return;
                                    }

                                    else {
 message.reply(`${message.client.emoji.fail} ${language.remind14}`);
                                             reminderstarted.delete(message.author.id);   
                                    }
                                              
                            }).catch(() => {
                              message.reply(`${message.client.emoji.fail} ${language.remind15}`);
                                     reminderstarted.delete(message.author.id);
                            });


                         return;

                                    } else {
message.reply(`${message.client.emoji.fail} ${language.remind14}`);
reminderstarted.delete(message.author.id);  
                                    }
                                            
                            }).catch(() => {
                       message.reply(`${message.client.emoji.fail} ${language.remind15}`);
                                     reminderstarted.delete(message.author.id);
                            });


                                  return;
                                    }

                                    else {

                                           message.reply(`${message.client.emoji.fail} ${language.remind14}`);
                                             reminderstarted.delete(message.author.id);  
                                    }
                            }).catch(() => {
                       message.reply(`${message.client.emoji.fail} ${language.remind15}`);
                                     reminderstarted.delete(message.author.id);
                            });







         return;
                                    }

                                    else
                                          message.reply(`${message.client.emoji.fail} ${language.remind14}`);
                                             reminderstarted.delete(message.author.id);     
                            }).catch(() => {
                       message.reply(`${message.client.emoji.fail} ${language.remind15}`);
                                     reminderstarted.delete(message.author.id);
                            });
    }
};