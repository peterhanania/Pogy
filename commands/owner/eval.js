const Command = require('../../structures/Command');
const util = require('util');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'eval',
        aliases: ['ev'],
        description: 'This is for the developers.',
        category: 'Owner',
        usage: [ '<thing-to-eval>' ],
        ownerOnly: true
      });
    }

    async run(message, args) {
      const input = args.join(' ');
    if (!input) return message.channel.send(`What do I evaluate?`)
    if(!input.toLowerCase().includes('token')) {

    let embed =  ``;

      try {
        let output = eval(input);
        if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
        
         embed = `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``

      } catch(err) {
        embed = `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``
      }

      message.channel.send(embed);

    } else {
      message.channel.send('Bruh you tryina steal my token huh?');
    }
    }
};
