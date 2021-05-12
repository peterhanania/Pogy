const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'invite',
        aliases: [ 'inv' ],
        description: 'Sends you Pogys invite link',
        category: 'Utility',
        cooldown: 3
      });
    }

    async run(message) {
       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      
      const embed = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${language.invite}(https://main.pogy.xyz/invite) ${message.client.emoji.success}`);

      await message.channel.send(embed)  
    }
};