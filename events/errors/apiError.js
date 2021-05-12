const Event = require('../../structures/Event');
const Discord = require('discord.js');

module.exports = class extends Event {

  async run(error, message, command) {
    console.log(error);
   
   message.channel.send(``)
  }
};