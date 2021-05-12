const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const discord = require('discord.js');
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'trumptweet',
        aliases: [ 'trump' , 'tweet'],
        description: 'Make trump say a message!',
        category: 'Images',
        usage: '<text>',
        examples: [ 'trumptweet Hey its me' ],
        cooldown: 3
      });
    }

    async run(message, args) {

      const client = message.client
      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
    
    if (!args[0]) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.changeErrorValid}`));
    
        let tweet = message.content.slice(message.content.indexOf(args[0]), message.content.length);
        if (tweet.length > 68) tweet = tweet.slice(0, 65) + '...';
    
        try {
          const res = await fetch('https://nekobot.xyz/api/imagegen?type=trumptweet&text=' + tweet);
          const img = (await res.json()).message;
          const embed = new discord.MessageEmbed()
            .setTitle(':flag_us:  Trump Tweet  :flag_us: ')
            .setImage(img)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(client.color.blue);
          message.channel.send(embed);
        } catch (err) {
          console.log(`error: ${err}, command name: Trump Tweet`)
            message.reply(language.trumpError)
        }
      }
};