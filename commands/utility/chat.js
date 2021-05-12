const Command = require('../../structures/Command');
const chatcord = require('chatcord');
const chat = new chatcord.Client();
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'chat',
        description: `Chat with the bot!`,
        category: 'Utility',
        usage: '<message>',
        guildOnly: true,
        cooldown: 5,
      });
    }

    async run(message, args) {
      chat.chat(args).then(reply => {
        message.channel.send(reply)
      })
    }
};