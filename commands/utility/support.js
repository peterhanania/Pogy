const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const Discord = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'support',
        description: `Sends you Pogy's Support server`,
        category: 'Utility',
        cooldown: 3
      });
    }

    async run(message) {
     const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      
      const embed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${language.support}(https://discord.gg/FqdH4sfKBg) ${message.client.emoji.success}`);

      await message.channel.send(embed)  
    }
};