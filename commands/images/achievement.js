const Command = require('../../structures/Command');
const request = require('request-promise-native');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'achievement',
        aliases: ['minecraftachievement', 'mcachievement'],
        description: 'Get a minecraft achievement!',
        category: 'Images',
        usage: '<text>',
        examples: [ 'achievement Earnt a Diamond' ],
        cooldown: 5,
        disabled: true,
      });
    }

    async run(message, args) {

      const client = message.client;
      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      
          const text = args.join(" ");
     
            if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.changeErrorValid}`));
    
    
                if (text.length > 25) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.mcErrorCharacter}`));
                
                let numb = Math.ceil(Math.random() * 39)
           /* const superagent = require('superagent')
            const { body } = await superagent
                .get('https://www.minecraftskinstealer.com/achievement/a.php')
                .query({
                    i: numb,
                    h: 'Achievement Got!',
                    t: text
                });
            message.channel.send({ files: [{ attachment: body, name: 'achievement.png' }] 
          }); */
        
    
        }}    