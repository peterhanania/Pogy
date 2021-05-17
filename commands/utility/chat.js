const Command = require('../../structures/Command');
const Chatbot  =  require("discord-chatbot");
const chatbot  =  new  Chatbot({name: "Pogy", gender: "Male"});

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
     chatbot.chat(args).then(reply => {
        message.reply(reply)
      })
    }
};
