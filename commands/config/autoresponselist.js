const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const autoResponse = require('../../database/schemas/autoResponse.js');
const Guild = require('../../database/schemas/Guild');
const { prototype } = require('../../structures/Command');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'autoresponses',
        description: 'Gives a list of auto Responses in a guild',
        category: 'Config',
        aliases: [ 'ars', 'autoresponselist'],
        cooldown: 5,
      });
    }

    async run(message, args) {

      
      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
    
      const language = require(`../../data/language/${guildDB.language}.json`)

      await autoResponse.find({
        guildId: message.guild.id,
      }, (err, data) => {
        if (!data && !data.name) return message.channel.send(`${message.client.emoji.fail} ${language.cc5}`);
        let array =[]
        data.map((d, i) => array.push(d.name));

        let embed = new MessageEmbed()
      .setColor('PURPLE')
      .setTitle(`${language.cc6}`)
      .setDescription(array.join(" - "))
      .setFooter({text: message.guild.name})

      if (!Array.isArray(array) || !array.length) {
  embed.setDescription(`${language.cc5}`)
} else {
embed.setDescription(array.join(" - "))
}

      message.channel.send({embeds: [embed]})
      });

    }
};