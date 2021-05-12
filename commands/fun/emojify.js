const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const specialCodes = {
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '#': ':hash:',
  '*': ':asterisk:',
  '?': ':grey_question:',
  '!': ':grey_exclamation:',
  ' ': '   '
}

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'emojify',
        description: 'Emojifies the given text.',
        category: 'Fun',
        examples: [ 'emojify POG! '],
        cooldown: 3
      });
    }

    async run(message, args) {
      const client = message.client
      const guildDB = await Guild.findOne({
          guildId: message.guild.id
        });
      
        const language = require(`../../data/language/${guildDB.language}.json`)


      let text = message.content.slice(message.content.indexOf(args[0]), message.content.length);
      if (!args[0]) return message.channel.send(`${language.emojify}`)
      const user = message.mentions.users.first();
     if (user) return message.channel.send(`${language.dontmention}`)
  
      const emojified = text.toString().toLowerCase().split('').map(letter => {
        if (/[a-z]/g.test(letter)) {
          return `:regional_indicator_${letter}: `
        } else if (specialCodes[letter]) {
          return `${specialCodes[letter]} `
        }
        return letter
      }).join('').replace(/,/g, '     ')
      message.channel.send(emojified).catch(() => {

        message.channel.send(`${language.emojifyError}`).catch(() => {})
      })
    }
};