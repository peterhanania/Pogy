const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'restart',
        aliases: [ 'reboot' ],
        description: 'Restart the bot!',
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message) {
      await message.channel.send("Restarting!").catch(err => this.client.console.error(err));
      process.exit(1)
    }
};
