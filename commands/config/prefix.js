const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const discord = require("discord.js")

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'setprefix',
        description: 'Sets the prefix for this server',
        category: 'Config',
        usage: [ '<prefix>' ],
        examples: [ 'setprefix !'],
        cooldown: 3,
        guildOnly: true,
        userPermission: ['MANAGE_GUILD'],
      });
    }

    async run(message, args) {
      const settings = await Guild.findOne({
        guildId: message.guild.id,
      }, (err, guild) => {
        if (err) console.log(err)
      });

      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
      

      const language = require(`../../data/language/${guildDB.language}.json`);


      if(!args[0]) return message.channel.send(new discord.MessageEmbed().setColor(message.client.color.red).setDescription(`${message.client.emoji.fail} ${language.setPrefixMissingArgument}`))
  
      if(args[0].length > 5) return message.channel.send(new discord.MessageEmbed().setColor(message.client.color.red).setDescription(`${message.client.emoji.fail} ${language.setPrefixLongLength}`))
      
      message.channel.send(new discord.MessageEmbed().setColor(message.client.color.green).setDescription(`${message.client.emoji.success} ${language.setPrefixChange.replace("{prefix}", args[0])}`))
           await settings.updateOne({
                prefix: args[0]
            });
    }
  }    