const Command = require('../../structures/Command');
const figlet = require('util').promisify(require('figlet'));
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'asciify',
      aliases: [ 'bigtext', 'banner' ],
      description: 'Turns your text into an ASCII art.',
      category: 'Fun',
      usage: '<text>',
      cooldown: 3
    });
  }

  async run(message, args) {
    const guildDB = await Guild.findOne({
      guildId: message.guild.id
  });


    const language = require(`../../data/language/${guildDB.language}.json`)
    
    if (args.length < 1) {
      return message.channel.send(`${message.client.emoji.fail} ${language.changeErrorValid}`)
    }

    return message.channel.send(await figlet(args), { code: true }).catch(() => {
      message.channel.send(`${language.bigError}`)
    });
  }

};