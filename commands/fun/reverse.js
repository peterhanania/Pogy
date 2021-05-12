const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'reverse',
        aliases: [ 'rev' ],
        description: 'Sends the same message that you had sent but reversed.',
        category: 'Fun',
        usage: '<text>',
        examples: [ 'reverse Hello World' ]
      });
    }

    async run(message, args) {
      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
    
    
    if(!args[0]) return message.channel.send(`${language.reverseError}`)
            const text = args.join(' ')
            const converted = text.split('').reverse().join('');
            message.channel.send(new  discord.MessageEmbed().setDescription(`\u180E${converted}`).setColor(message.client.color.blue)).catch(() => {});
    
    

     
    }
};